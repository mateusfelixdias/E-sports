export function timeValidation(hourStart: string, hourEnd: string) {
  const [start, minutesStart] = hourStart.split(':').map(Number)
  const [end, minutesEnd] = hourEnd.split(':').map(Number)

  if (start >= end && minutesStart >= minutesEnd)
    return 'Por favor, verifique o horário selecionado!'
}
