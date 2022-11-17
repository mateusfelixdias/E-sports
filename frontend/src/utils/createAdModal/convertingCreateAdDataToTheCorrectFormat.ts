export function convertingCreateAdDataToTheCorrectFormat(
  discord: FormDataEntryValue,
  hourEnd: FormDataEntryValue,
  hourStart: FormDataEntryValue,
  name: FormDataEntryValue,
  yearsPlaying: FormDataEntryValue,
  weekDays: string[]
) {
  return {
    discord: String(discord),
    hourStart: String(hourStart),
    hourEnd: String(hourEnd),
    name: String(name),
    yearsPlaying: Number(yearsPlaying),
    weekDays: weekDays.map(Number),
  }
}
