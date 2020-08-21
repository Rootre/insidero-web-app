import {TCurrency} from './Currency'

export interface IPrice {
  getFormattedValue();
  convert();
}

export const formatNumber = (amount: number): string => {
  // return amount.toString().split('').reverse().join('').match(/.{1,3}/g).join(' ').split('').reverse().join('')
  return amount.toString().split('').reverse().reduce((acc, value, index) => value + (index % 3 === 0 ? ' ' : '') + acc, '')
}

function Price(value: number, currency: TCurrency): IPrice {
  this.value = value
  this.currency = currency

  return this
}

Price.prototype.getFormattedValue = function(): string {
  return `${formatNumber(this.value * this.currency.rate)} ${this.currency.name}`
}

Price.prototype.convert = function (currency: TCurrency): number {
  return this.value * currency.rate
}

export default Price