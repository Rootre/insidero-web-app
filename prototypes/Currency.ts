export type TCurrency = {
  name: string,
  ISO: string,
  rate: number,
}

function Currency(name: string, ISO: string, rate: number): TCurrency {
  return {
    name,
    ISO,
    rate,
  }
}

export default Currency