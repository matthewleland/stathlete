import { toast } from 'react-toastify'
function Request() {
  const onSubmit = (e) => {
    e.preventDefault()
    toast.success('Password reset email sent')
  }
  return (
    <>
      <section className="form flex justify-center mt-10">
        <form
          className="flex flex-col max-w-sm border-2 border-neutral rounded-lg px-5 "
          onSubmit={onSubmit}
        >
          <div className="text-3xl font-medium mt-5">Recover Account</div>
          <div className="form-group my-3">
            <input
              type="text"
              id="email"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-group my-3 mb-2">
            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Send Email
            </button>
          </div>
          <label className="my-3 p-2">
            Enter the email associated with your account. Then, press 'Send
            Recovery Email' and you will receive an email with a link to change
            the password to your account.
          </label>
        </form>
      </section>
    </>
  )
}

export default Request
