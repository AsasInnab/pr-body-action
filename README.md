# PR Body Action

This action overwrites the pr body. Useful for when you want to append information, such as URLs etc, to the PR without bloating the PR with comments.

## Inputs

### `body`

**Required** The new PR body to overwrite with

### `GITHUB_TOKEN`

**Required** Github token

## Example usage

    uses: AsasInnab/pr-body-action@v1
    with:
    	body: "This is my new PR body :)"
    	GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
