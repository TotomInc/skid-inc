# [SkidInc](https://totominc.github.io/skid-inc/ "SkidInc")

SkidInc is an incremental-game with a hacking theme.

### Want to help?

You don't need to program if you want to help me, you can create issues for any bugs you encounter or give ideas.

The community is growing on the subreddit [/r/skidinc](https://www.reddit.com/r/skidinc "SkidInc subreddit"), check it out!

For any coders that want to help:

1. Clone the repo.
2. Install all dev dependencies with `npm i`. Test your changes on a local server, using `npm start`.
3. Before pushing everything, run `npm run build` (concat + minify).
4. Please, carefully test changes that you have done, otherwise I will not accept the pull-request.

### Workflow:

For any pull request, create your own branch.

New features incoming are on a developement branch. When we reach a milestone on this branch, I merge it to `stable` branch.

The live website branch is `gh-pages`, it refers to `stable` branch.