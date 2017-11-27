import React from 'react';
import './Business.css';



class Business extends React.Component {

	render(){
		//let addr = this.props.business.address + ", " + this.props.business.city;
		let addr = this.props.business.displayAddress.join("+").replace(/, /g,"+").replace(/ /g,"+").replace(/,/g,"+");
		let loc = "@"+this.props.business.coordinates['latitude']+","+this.props.business.coordinates['longitude'];
		//let name = this.props.business.name.replace(/ /,"+");

		const addrUrl = "https://www.google.com/maps/place" + "/" + addr + "/" + loc;
		return (
			<div className="Business">
			  <div className="image-container">
			    <img src={this.props.business.imageSrc} alt="" />
			  </div>
			  <h2>{this.props.business.name}</h2>
			  <div className="Business-information">
			    <div className="Business-address">
			    <a href={addrUrl} target="_blank">
			      <p>{this.props.business.address}</p>
			      <p>{this.props.business.city}</p>
			      <p>{this.props.business.state} {this.props.business.zipCode}</p>
			    </a>
			    </div>
			    <div className="Business-reviews">
			      <h3>{this.props.business.category}</h3>
			      <h3 className="rating">{this.props.business.rating} stars</h3>
			      <p>{this.props.business.reviewCount} reviews</p>
			    </div>
			  </div>
			</div>
		);
	}

}

export default Business;
