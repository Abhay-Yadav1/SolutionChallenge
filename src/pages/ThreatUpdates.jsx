export default function ThreatUpdates() {
	return (
		<div id='main-container'>
			<main id='content'>
				<div
					className='threat-updates-container'
					id='threat-updates-page'
				>
					<div className='threat-updates-header'>
						<h2 className='section-heading'>Threat Updates</h2>
					</div>
					<div id='threat-updates-list'>
						<div className='threat-card'>
							<h3>New Piracy Threat Detected</h3>
							<p>
								<strong>File:</strong> example.pdf
							</p>
							<p>
								<strong>Website:</strong> piratebay.com
							</p>
							<p>
								<strong>Date:</strong> 2024-01-20
							</p>
							<button
								className='mark-reviewed-btn button'
								data-threat-id='1'
							>
								Mark as Reviewed
							</button>
						</div>
						<div className='threat-card'>
							<h3>Takedown Request Sent</h3>
							<p>
								<strong>File:</strong> another-example.mp4
							</p>
							<p>
								<strong>Website:</strong> torrentz.eu
							</p>
							<p>
								<strong>Date:</strong> 2024-01-25
							</p>
							<button
								className='mark-reviewed-btn button'
								data-threat-id='2'
							>
								Mark as Reviewed
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
