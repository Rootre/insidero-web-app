import { useRouter } from 'next/router'

const Offer = () => {
  const {query} = useRouter()

  return (
    <div>
      Offer detail {JSON.stringify(query)}
    </div>
  )
}

export default Offer