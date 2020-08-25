const region = t => ({
  type: 'array',
  title: t('regionTitle'),
  items: {
    type: 'number',
  }
})

export default region