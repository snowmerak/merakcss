export function replayMotion(target) {
  const motionClass = target.dataset.motionReplay

  if (!motionClass) return

  target.classList.remove(motionClass)
  void target.offsetWidth
  target.classList.add(motionClass)
}

export function setupMotionDemo({ trigger, targets }) {
  if (!trigger || !targets) return

  trigger.addEventListener('click', () => {
    targets.forEach((target) => replayMotion(target))
  })
}
