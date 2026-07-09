const translatePattern = /translate\(([-\d.]+)[ ,]([-\d.]+)\)/

function readNodePosition(node) {
  const transform = node.getAttribute('transform') ?? ''
  const match = transform.match(translatePattern)

  if (!match) return { x: 0, y: 0 }

  return {
    x: Number(match[1]),
    y: Number(match[2]),
  }
}

function writeNodePosition(node, position) {
  node.dataset.x = String(position.x)
  node.dataset.y = String(position.y)
  node.setAttribute('transform', `translate(${position.x} ${position.y})`)
}

function getSvgPoint(svg, event) {
  const point = svg.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY

  return point.matrixTransform(svg.getScreenCTM().inverse())
}

function getNodeGeometry(node) {
  const position = {
    x: Number(node.dataset.x),
    y: Number(node.dataset.y),
  }
  const circle = node.querySelector('circle')
  const rect = node.querySelector('rect')

  if (circle) {
    return {
      type: 'circle',
      ...position,
      r: Number(circle.getAttribute('r')),
    }
  }

  if (rect) {
    return {
      type: 'rect',
      ...position,
      left: Number(rect.getAttribute('x')),
      top: Number(rect.getAttribute('y')),
      width: Number(rect.getAttribute('width')),
      height: Number(rect.getAttribute('height')),
    }
  }

  return {
    type: 'point',
    ...position,
  }
}

function getNodeGeometries(svg) {
  return new Map(
    [...svg.querySelectorAll('[data-node-id]')].map((node) => [
      node.dataset.nodeId,
      getNodeGeometry(node),
    ]),
  )
}

function getBoundaryPoint(from, toward) {
  const dx = toward.x - from.x
  const dy = toward.y - from.y
  const length = Math.hypot(dx, dy) || 1

  if (from.type === 'circle') {
    return {
      x: from.x + (dx / length) * from.r,
      y: from.y + (dy / length) * from.r,
    }
  }

  if (from.type === 'rect') {
    const right = from.left + from.width
    const bottom = from.top + from.height
    const candidates = []

    if (dx > 0) candidates.push(right / dx)
    if (dx < 0) candidates.push(from.left / dx)
    if (dy > 0) candidates.push(bottom / dy)
    if (dy < 0) candidates.push(from.top / dy)

    const scale = Math.min(...candidates.filter((value) => value > 0))

    return {
      x: from.x + dx * scale,
      y: from.y + dy * scale,
    }
  }

  return {
    x: from.x,
    y: from.y,
  }
}

function getEdgePath(from, to, curve = 'default') {
  const distanceX = to.x - from.x
  const distanceY = to.y - from.y
  const bend = Math.max(Math.abs(distanceX) * 0.42, 48)

  if (curve === 'arc-up') {
    const lift = Math.max(Math.abs(distanceY) + 72, 92)
    return `M${from.x} ${from.y} C${from.x + bend} ${from.y - lift} ${to.x - bend} ${to.y - lift} ${to.x} ${to.y}`
  }

  if (Math.abs(distanceX) >= Math.abs(distanceY)) {
    return `M${from.x} ${from.y} C${from.x + bend} ${from.y} ${to.x - bend} ${to.y} ${to.x} ${to.y}`
  }

  const verticalBend = Math.max(Math.abs(distanceY) * 0.42, 44)
  return `M${from.x} ${from.y} C${from.x} ${from.y + verticalBend} ${to.x} ${to.y - verticalBend} ${to.x} ${to.y}`
}

function updateEdges(svg) {
  const geometries = getNodeGeometries(svg)

  svg.querySelectorAll('[data-from][data-to]').forEach((edge) => {
    const fromNode = geometries.get(edge.dataset.from)
    const toNode = geometries.get(edge.dataset.to)

    if (!fromNode || !toNode) return

    const from = getBoundaryPoint(fromNode, toNode)
    const to = getBoundaryPoint(toNode, fromNode)

    edge.setAttribute('d', getEdgePath(from, to, edge.dataset.curve))
  })
}

function clampPosition(position, svg) {
  const viewBox = svg.viewBox.baseVal
  const padding = 44

  return {
    x: Math.min(viewBox.x + viewBox.width - padding, Math.max(viewBox.x + padding, position.x)),
    y: Math.min(viewBox.y + viewBox.height - padding, Math.max(viewBox.y + padding, position.y)),
  }
}

export function setupGraphDrag(svg) {
  if (!svg) return

  const nodes = [...svg.querySelectorAll('[data-node-id]')]
  let dragState = null

  nodes.forEach((node) => {
    writeNodePosition(node, readNodePosition(node))

    node.addEventListener('pointerdown', (event) => {
      const startPoint = getSvgPoint(svg, event)
      const startPosition = {
        x: Number(node.dataset.x),
        y: Number(node.dataset.y),
      }

      dragState = {
        node,
        startPoint,
        startPosition,
      }

      node.classList.add('is-dragging')
      node.setPointerCapture(event.pointerId)
      event.preventDefault()
    })

    node.addEventListener('pointermove', (event) => {
      if (!dragState || dragState.node !== node) return

      const point = getSvgPoint(svg, event)
      const nextPosition = clampPosition(
        {
          x: dragState.startPosition.x + point.x - dragState.startPoint.x,
          y: dragState.startPosition.y + point.y - dragState.startPoint.y,
        },
        svg,
      )

      writeNodePosition(node, nextPosition)
      updateEdges(svg)
    })

    node.addEventListener('pointerup', (event) => {
      if (!dragState || dragState.node !== node) return

      node.classList.remove('is-dragging')
      node.releasePointerCapture(event.pointerId)
      dragState = null
    })

    node.addEventListener('pointercancel', () => {
      node.classList.remove('is-dragging')
      dragState = null
    })
  })

  updateEdges(svg)
}
