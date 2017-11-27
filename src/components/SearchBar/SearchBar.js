import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			term: '',
			location: '',
			sortBy: 'best_match'
		};
		this.handleTermChange 		= this.handleTermChange.bind(this);
		this.handleLocationChange	= this.handleLocationChange.bind(this);
		this.handleSearch			= this.handleSearch.bind(this);
		this.handleKeyUp			= this.handleKeyUp.bind(this);
	}

	sortByOptions = {
		"Best Match": "best_match",
		"Most Reviewed": "review_count",
		"Highest Rated": "rating"
	}

	getSortByClass(sortByOption) {
		if (this.state.sortBy === sortByOption) return 'active';
		else return '';
	}	

	handleSortByChange(sortByOption){
		this.setState({sortBy: sortByOption});
		this.props.searchYelp(this.state.term, this.state.location, sortByOption);
}

	handleTermChange(e){
		this.setState({term: e.target.value});
	}

	handleLocationChange(e){
		this.setState({location: e.target.value});
	}

	handleSearch(e){
		this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
		e.preventDefault();
	}

	handleKeyUp(e){
		if(e.key !== "Enter") return;
		this.handleSearch(e);
	}

	renderSortByOptions(){
		return Object.keys(this.sortByOptions).map( sortByOption => {
			let sortByOptionValue = this.sortByOptions[sortByOption];
			return (
				<li 
				key = {sortByOptionValue}
				className = {this.getSortByClass(sortByOptionValue)}
				onClick = {this.handleSortByChange.bind(this, sortByOptionValue)}
				>{sortByOption}</li>
			);
		});
	}

	render(){
		return (
			<div className="SearchBar">
			  <div className="SearchBar-sort-options">
			    <ul>
			      {this.renderSortByOptions()}
			    </ul>
			  </div>
			  <div className="SearchBar-fields">
			    <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleKeyUp}/>
			    <input placeholder="Where?"  onChange={this.handleLocationChange} onKeyPress={this.handleKeyUp}/>
			  </div>
			  <div className="SearchBar-submit">
			    <a onClick={this.handleSearch}>Let's Go</a>
			  </div>
			</div>
		);
	}
}

export default SearchBar;
