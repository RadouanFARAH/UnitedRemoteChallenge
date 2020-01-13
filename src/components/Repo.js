import React from 'react'

const Repo = (props) => {
    return (
        <div className="card mb-3">
            <div className="row">
                <div className="col-4">
                    <img src={props.owner.avatar_url}   height="195px" width="195px" alt=""/>
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h2>{props.name}</h2>
                        <p className="card-text">{props.description}</p>
                        <div className="row">
                        <div className="col" style={{border:'2px solid black', width:'fit-content'}}>
                            Nb Stars : {props.stargazers_count}
                        </div>  
                        <div className="col" style={{border:'2px solid black', width:'fit-content'}}>
                            Nb Open Issues : {props.open_issues_count}
                        </div>
                        <div>
                            Pushed {Math.floor((Date.now() - new Date(props.pushed_at))/(1000*60*60*24))} days ago by {props.owner.login}
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repo;