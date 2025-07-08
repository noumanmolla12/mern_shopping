import React from 'react'

const NotFound = () => {
  return (
    <div>
      <section id="or-page-not-found" class="or-page-not-found-section">
		<div class="container">
      <br/>
			<div class="or-page-not-found-content text-center">
				<div class="or-page-not-found-img">
					<img src="https://html.themexriver.com/organio/assets/img/404.png" alt=""/>
				</div>
				<div class="or-page-not-found-text headline pera-content">
					<h3>Page Not Found</h3>
					<p>Something went wrong, Looks like this page doesn't exist anymore.</p>
          <div className="row justify-content-center">
                    <a href="/" className="btn btn-primary btn-lg" style={{ backgroundColor: '#ff6347', borderColor: '#ff6347', width:'170px' }}>Back to Home</a>
                </div>
				</div>
			</div>
		</div>
    <br/>
	</section>
    </div>
  )
}

export default NotFound
