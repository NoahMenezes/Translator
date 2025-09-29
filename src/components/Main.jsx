import React from 'react'

const Main = () => {
  return (
    <>
      <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
</div>
<p>Select a language</p>
<div className="btn-group">
  <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Right-aligned menu example
  </button>
  <ul className="dropdown-menu dropdown-menu-end">
    <li><button className="dropdown-item" type="button">Action</button></li>
    <li><button className="dropdown-item" type="button">Another action</button></li>
    <li><button className="dropdown-item" type="button">Something else here</button></li>
  </ul>
</div>
<p><button type="button" className="btn btn-primary">Translate</button></p>
    </>
  )
}

export default Main
