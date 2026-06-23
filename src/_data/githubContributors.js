import { execFileSync } from 'node:child_process';

const fallbackRepo = 'adamdjbrett/11ty-bearblog';

function getOriginRepo() {
	try {
		const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' }).trim();
		const match = remote.match(/github\.com[:/](.+)$/);
		return match?.[1]?.replace(/\.git$/, '') || fallbackRepo;
	} catch {
		return fallbackRepo;
	}
}

function localAuthors() {
	try {
		const output = execFileSync('git', ['log', '--format=%aN <%aE>'], { encoding: 'utf8' });
		const seen = new Set();
		return output
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean)
			.filter((line) => {
				if (seen.has(line)) return false;
				seen.add(line);
				return true;
			})
			.map((line) => ({ name: line }));
	} catch {
		return [{ name: 'Project contributors' }];
	}
}

export default async function () {
	const repo = getOriginRepo();
	const headers = {
		Accept: 'application/vnd.github+json',
		'User-Agent': '11ty-bearblog'
	};

	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	}

	try {
		const response = await fetch(`https://api.github.com/repos/${repo}/contributors`, {
			headers,
			signal: AbortSignal.timeout(2500)
		});
		if (!response.ok) throw new Error(`GitHub contributors request failed: ${response.status}`);
		const contributors = await response.json();
		return contributors.map((contributor) => ({
			login: contributor.login,
			url: contributor.html_url,
			contributions: contributor.contributions
		}));
	} catch {
		return localAuthors();
	}
}
