export const config = { runtime: 'edge' };

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { headers: { accept: 'application/json' }, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeArbeitnow(list = []) {
  return list.map((j) => ({
    source: 'arbeitnow',
    slug: j.slug,
    title: j.title,
    company_name: j.company_name,
    description: j.description,
    location: j.location,
    salary: j.salary ?? null,
    tags: Array.isArray(j.tags) ? j.tags : [],
    url: j.url,
  }));
}

function normalizeRemotive(list = []) {
  return list.map((j) => ({
    source: 'remotive',
    slug: `remotive-${j.id}`,
    title: j.title,
    company_name: j.company_name,
    description: j.description,
    location: j.candidate_required_location || '',
    salary: j.salary || null,
    tags: Array.isArray(j.tags) ? j.tags : [],
    url: j.url,
  }));
}

function dedupeBySlug(jobs) {
  const seen = new Set();
  const result = [];
  for (const job of jobs) {
    if (job && job.slug && !seen.has(job.slug)) {
      seen.add(job.slug);
      result.push(job);
    }
  }
  return result;
}

export default async function handler() {
  try {
    const [arbeitnowData, remotiveData, jobicyData] = await Promise.allSettled([
      fetchJson('https://arbeitnow.com/api/job-board-api'),
      fetchJson('https://remotive.com/api/remote-jobs'),
      fetchJson('https://jobicy.com/api/v2/remote-jobs'),
    ]);

    const arbeitnowJobs = arbeitnowData.status === 'fulfilled' ? normalizeArbeitnow(arbeitnowData.value?.data || []) : [];
    const remotiveJobs = remotiveData.status === 'fulfilled' ? normalizeRemotive(remotiveData.value?.jobs || []) : [];
    const jobicyJobs = jobicyData.status === 'fulfilled' ? (function normalizeJobicy(list = []) {
      return list.map((j) => ({
        source: 'jobicy',
        slug: `jobicy-${j.id ?? j.slug ?? Math.random().toString(36).slice(2)}`,
        title: j.title ?? j.jobTitle ?? '',
        company_name: j.company_name ?? j.companyName ?? j.company?.name ?? '',
        description: j.description ?? j.jobDescription ?? '',
        location: j.candidate_required_location ?? j.location ?? '',
        salary: j.salary ?? null,
        tags: Array.isArray(j.tags) ? j.tags : (Array.isArray(j.jobTags) ? j.jobTags : []),
        url: j.url ?? j.jobUrl ?? '',
      }));
    })(jobicyData.value?.jobs || jobicyData.value?.data || []) : [];

    const merged = dedupeBySlug([...arbeitnowJobs, ...remotiveJobs, ...jobicyJobs]);

    return new Response(JSON.stringify({ data: merged }), {
      headers: {
        'content-type': 'application/json',
        // Cache at the edge for 5 minutes, allow stale while revalidate
        'cache-control': 's-maxage=300, stale-while-revalidate',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to aggregate jobs' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}


