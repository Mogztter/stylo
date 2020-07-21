import { BibLatexParser } from 'biblatex-csl-converter'

const compare = (a, b) => {
  if (a.key < b.key) return -1
  if (a.key > b.key) return 1
  return 0
}

const flatten = (entryTitle) => {
  return entryTitle
    .map(({ text }) => text)
    .join('')
}

/**
 * @param {string} Bibtex bibliography
 * @returns {Array.<{ title: string, key: string, type: string }}
 */
export default (input) => {
  const parser = new BibLatexParser(input, {
    processUnexpected: true,
    processUnknown: true,
    async: false
  })

  const {entries} = parser.parse()

  return Object.entries(entries)
    .map(([key, entry]) => ({
      title: flatten(entry.fields.title),
      type: entry.bib_type,
      key: entry.entry_key,
      entry
    }))
    .sort(compare)
}
