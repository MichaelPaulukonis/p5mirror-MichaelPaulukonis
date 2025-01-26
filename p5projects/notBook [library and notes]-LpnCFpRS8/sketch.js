// NOTE: when used from an external file (md.js)
// throws out a bunch of weird "\n" and other oddities
const pages = [
  'notes',
  'classes',
  'processing',
  'animation',
  'color',
  'styletransfer',
  'mosaic',
  'TODO',
  'text',
  'audio',
  'shaders',
  'collage',
  'noise',
  'noc',
  'hydra',
  'knowledgebase'
]
const targ = document.getElementById('main')
const links = document.getElementById('links')

const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

const buildAnchor = (id, content) => {
  const anchor = document.createElement('a')
  // only add `about:srcdoc` if we're running on editor.p5js.org (ugh)
  const prefix = inIframe() ? 'about:srcdoc' : ''
  anchor.href = `${prefix}#${id}`
  anchor.innerHTML = content
  return anchor
}

const buildPageElement = (page, i) => {
  const header = document.createElement('header')
  const altheader = (i % 2 === 0) ? 'header1' : 'header2'
  header.className = `${altheader} ${page}-header`
  const div = document.createElement('section')
  div.id = `${page}`
  const h1 = document.createElement('h1')
  h1.innerHTML = `${page}`
  const container = document.createElement('container')
  container.className = 'container'
  const doc = document.createElement('zero-md')
  doc.src = `./docs/${page}.txt`

  header.appendChild(h1)
  div.appendChild(header)
  container.appendChild(doc)
  div.appendChild(container)
  targ.appendChild(div)

  const anchor = buildAnchor(div.id, page)
  const li = document.createElement('li')
  li.appendChild(anchor)
  links.appendChild(li)
}

pages.forEach((page, i) => buildPageElement(page,i))