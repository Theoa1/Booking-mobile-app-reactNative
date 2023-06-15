const getAvailableSlotWithinHour = (
  availableSlotMins,
  totalMins,
  minOffset,
) => {
  const resultMins = []
  let index = 0
  let substractedResult = totalMins

  while (substractedResult - availableSlotMins > 0) {
    substractedResult = substractedResult - availableSlotMins
    if (index === 0 && minOffset) {
      substractedResult = substractedResult + minOffset
    }

    resultMins.push(Math.abs(totalMins - substractedResult))
    index += 1
  }
  return { resultMins, substractedResult }
}

export const getAvailableWorkingHourSlots = (
  availableSlotMins,
  startHour,
  endHour,
  offHours = [],
) => {
  const totalMins = 60
  const availableSlots = []
  let offsetMins = 0

  for (
    let availableHour = startHour;
    availableHour < endHour;
    availableHour++
  ) {
    const isOffHour = offHours.includes(availableHour)
    if (!isOffHour) {
      const { resultMins, substractedResult } = getAvailableSlotWithinHour(
        availableSlotMins,
        totalMins,
        offsetMins,
      )
      offsetMins = substractedResult

      resultMins.forEach(resultMin => {
        const formattedMin = resultMin > 9 ? `${resultMin}` : `0${resultMin}`
        const formattedHour =
          availableHour > 9 ? `${availableHour}` : `0${availableHour}`
        availableSlots.push(`${formattedHour}:${formattedMin}`)
      })
    }
  }

  return availableSlots
}
