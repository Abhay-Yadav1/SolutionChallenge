function Listings() {
	return (
		<div id='main-container'>
			<main id='content'>
				<div className='listings-container'>
					<div className='listings-header'>
						<h2 className='section-heading'>Piracy Reports</h2>
					</div>
					<div className='search-wrapper'>
						<div className='search-container'>
							<input
								type='search'
								id='listings-search'
								placeholder='Search listings...'
								className='search-input tooltip'
							/>
							<span className='tooltiptext'>
								Search by file name, website, etc.
							</span>
						</div>
					</div>
					<table id='piracy-table'>
						<thead>
							<tr>
								<th data-sortable='file-name'>File Name</th>
								<th data-sortable='match-percentage'>Match %</th>
								<th data-sortable='website'>Website</th>
								<th data-sortable='date-found'>Date Found</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr data-id='1'>
								<td>example.pdf</td>
								<td>95%</td>
								<td>piratebay.com</td>
								<td>2024-01-20</td>
								<td>
									<div className='action-buttons'>
										<button className='button action-btn tooltip'>
											View
											<span className='tooltiptext'>View report details</span>
										</button>
										<button
											className='button action-btn'
											id='generate-takedown-btn'
										>
											Generate Takedown
										</button>
									</div>
								</td>
							</tr>
							<tr data-id='2'>
								<td>another-example.mp4</td>
								<td>88%</td>
								<td>torrentz.eu</td>
								<td>2024-01-25</td>
								<td>
									<div className='action-buttons'>
										<button className='button action-btn tooltip'>
											View
											<span className='tooltiptext'>View report details</span>
										</button>
										<button className='button action-btn'>
											Generate Takedown
										</button>
									</div>
								</td>
							</tr>
							<tr data-id='3'>
								<td>copyrighted-image.png</td>
								<td>75%</td>
								<td>example-forum.net</td>
								<td>2024-01-28</td>
								<td>
									<div className='action-buttons'>
										<button className='button action-btn tooltip'>
											View
											<span className='tooltiptext'>View report details</span>
										</button>
										<button className='button action-btn'>
											Generate Takedown
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<div
						id='takedown-modal'
						className='modal d-none'
					>
						<div className='modal-content'>
							<span
								className='close-button'
								id='cancel-takedown-btn'
							>
								&times;
							</span>
							<h3>Confirm Takedown</h3>
							<p>
								Are you sure you want to generate a takedown request for this
								listing?
							</p>
							<div className='modal-actions'>
								<button
									id='confirm-takedown-btn'
									className='button'
								>
									Confirm Takedown
								</button>
								<button
									id='cancel-takedown-btn'
									className='button'
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Listings;
