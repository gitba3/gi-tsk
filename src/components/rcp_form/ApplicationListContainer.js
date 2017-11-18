import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as applicationAction from '../../action/ApplicationAction';
import ApplicationList from './ApplicationList';



export class ApplicationListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedAppId: undefined};

        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleEditCourse = this.handleEditCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getApplicationsAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddCourse() {
        this.props.history.push('/application');
    }



    handleEditCourse() {
        const selectedAppId = this.state.selectedAppId;

        if (selectedAppId) {
            this.setState({selectedAppId: undefined});            
            this.props.history.push(`/application/${selectedAppId}`);
        }        
    }



    handleDelete() {
        const selectedAppId = this.state.selectedAppId;

        if (selectedAppId) {
            this.setState({selectedAppId: undefined});                        
            this.props.action.deleteApplicationAction(selectedAppId)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedAppId: row.id});
        }
    }



    render() {
        const { applications } = this.props;

        if (!applications) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Road Corridor Permit applications</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddCourse}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditCourse}                                
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>                                

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ApplicationList applications={applications} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    applications: state.applicationsReducer.applications
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(applicationAction, dispatch)

});



ApplicationListContainer.propTypes = {
    applications: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListContainer);
