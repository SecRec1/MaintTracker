import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "../../style/search-rec-list.scss"


const SearchList = (props)=>{
    const machineList = props.records.map(record =>{
        return(
            <div className="search-list-wrapper" key={record.id}>
                <h1 className="des">{record.designator}</h1>
                <h2 className="subdes">{record.subdesignator}</h2>
                <Link to={`/Specs/${record.sn}`} className="page-link">
                <FontAwesomeIcon className="icon" icon="file-lines" />
                </Link>
            </div>
        )
    });








return <div>{machineList}</div>
}
export default SearchList;