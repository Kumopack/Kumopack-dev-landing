import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'

const FactoryCategory = ({ id, title, lists }) => {
	return (
		<React.Fragment>
			<style>{`
				.supplier-product-category.accordion .card-header .btn {
					background-color: transparent !important;
					border: none !important;
					outline: none !important;
					box-shadow: none !important;

					text-align: start !important; 
					display: block !important;
				}

				.supplier-product-category.accordion .card-header {
					border-left: 0 !important;
					border-right: 0 !important;
					border-top: 0 !important;
					outline: none !important;

					transiton: all 0.3s ease-in-out;
				}

				.supplier-product-category.accordion .card:has(.collapse.show) .card-header, .supplier-product-category.accordion .card:has(.collapsing) .card-header  {
					background-color: #f2f4f7 !important;
				}

				.supplier-product-category.accordion .card-header:hover {
					background-color: #f9fafb !important;
				}

				
			`}</style>
			<Accordion
				className="supplier-product-category border-1px border-kumopack-grey-200 border-radius-8px"
				defaultActiveKey={id}>
				<Card>
					<Card.Header className="py-2 px-2 border-1px border-kumopack-grey-200 bg-kumopack-base-white">
						<Accordion.Toggle as={Button} eventKey={id} className="w-100">
							{title}
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={id}>
						<Card.Body>
							<div className="row gy-3">
								{lists.map((item, idx) => (
									<div key={`${id}-${idx}`} className="col-12 text-kumopack-grey-900 fs-7">
										{idx + 1}. {item}
									</div>
								))}
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</React.Fragment>
		// <Accordion defaultActiveKey="0">
		// 	<Accordion.Item eventKey="0">
		// 		<Accordion.Header>{title}</Accordion.Header>
		// 		<Accordion.Body>
		// 			<React.Fragment>
		// 				<div className="row gy-5">
		// 					{lists.map((item, idx) => (
		// 						<div key={`${id}-${idx}`} className="col-12 text-kumopack-grey-900 fs-7">
		// 							{idx + 1}. {item}
		// 						</div>
		// 					))}
		// 				</div>
		// 			</React.Fragment>
		// 		</Accordion.Body>
		// 	</Accordion.Item>
		// </Accordion>
	)
}

export default FactoryCategory
