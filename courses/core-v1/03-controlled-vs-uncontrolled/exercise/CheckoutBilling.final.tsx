import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

interface CheckoutBillingProps {
  onSubmit(sameAsBilling: boolean, fields: Fields): void
}

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({ onSubmit }) => {
  const [sameAsBilling, setSameAsBilling] = React.useState(false)
  const [billingName, setBillingName] = React.useState('')
  const [billingAddress, setBillingAddress] = React.useState('')
  const [shippingName, setShippingName] = React.useState('')
  const [shippingAddress, setShippingAddress] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields: Fields = {
      billingName,
      billingAddress,
      shippingName: sameAsBilling ? billingName : shippingName,
      shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
    }
    onSubmit(sameAsBilling, fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            required
            defaultValue={billingName}
            onChange={(event) => setBillingName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            defaultValue={billingAddress}
            onChange={(event) => setBillingAddress(event.target.value)}
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            value={sameAsBilling ? billingName : shippingName}
            onChange={(event) => setShippingName(event.target.value)}
            disabled={sameAsBilling}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={(event) => setShippingAddress(event.target.value)}
            disabled={sameAsBilling}
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling

type Fields = {
  billingName: string
  billingAddress: string
  shippingName: string
  shippingAddress: string
}
