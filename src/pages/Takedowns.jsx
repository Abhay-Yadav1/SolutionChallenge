export default function Takedowns() {
	return (
		<div className='container'>
			<section className='takedowns-section fade-in'>
				<h2 className='section-heading'>Takedown Requests</h2>
				<p>
					Generate and manage takedown requests for confirmed IP violations.
				</p>

				<div className='takedowns-actions'>
					<button className='button primary seafoam'>
						<span className='button-text'>Generate New Request</span>
						<i className='fas fa-plus-circle'></i>
					</button>
				</div>

				<div className='takedowns-list'>
					<div className='takedown-tile fade-in'>
						<div className='takedown-tile-header'>
							<span className='request-id'>#TK001</span>
							<span className='status pending'>
								<i className='fas fa-hourglass-half'></i> Pending
							</span>
						</div>
						<div className='takedown-tile-body'>
							<p>
								<strong>URL:</strong>{' '}
								<a href='#'>https://example.com/infringing-content-1</a>
							</p>
							<p>
								<strong>Date:</strong> 2025-02-02
							</p>
						</div>
						<div className='takedown-tile-actions'>
							<button className='button secondary magenta small'>
								View Details
							</button>
						</div>
					</div>

					<div className='takedown-tile fade-in'>
						<div className='takedown-tile-header'>
							<span className='request-id'>#TK002</span>
							<span className='status sent'>
								<i className='fas fa-paper-plane'></i> Sent
							</span>
						</div>
						<div className='takedown-tile-body'>
							<p>
								<strong>URL:</strong>{' '}
								<a href='#'>https://example.com/infringing-content-2</a>
							</p>
							<p>
								<strong>Date:</strong> 2025-02-01
							</p>
						</div>
						<div className='takedown-tile-actions'>
							<button className='button secondary magenta small'>
								View Details
							</button>
						</div>
					</div>

					<div className='takedown-tile fade-in'>
						<div className='takedown-tile-header'>
							<span className='request-id'>#TK003</span>
							<span className='status resolved'>
								<i className='fas fa-check-circle'></i> Resolved
							</span>
						</div>
						<div className='takedown-tile-body'>
							<p>
								<strong>URL:</strong>{' '}
								<a href='#'>https://example.com/infringing-content-3</a>
							</p>
							<p>
								<strong>Date:</strong> 2025-01-30
							</p>
						</div>
						<div className='takedown-tile-actions'>
							<button className='button secondary magenta small'>
								View Details
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
