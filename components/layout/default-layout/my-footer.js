export default function MyFooter() {
  return (
    <footer className="footer mt-auto py-3">
      <div className=" w-100 d-flex align-items-center justify-content-end px-5">
        <span className="footer-text">© All Rights Reserved.</span>
        <img
          src="/Logo.svg"
          style={{ width: '160px',height:'100%' , marginLeft: '24px' }}
          alt=""
        />
      </div>
    </footer>
  )
}
