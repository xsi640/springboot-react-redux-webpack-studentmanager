import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Table } from 'antd'
import UserEditor from './usereditor'
import * as UserAction from '../../actions/useraction'

class UserManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            selectedRowKeys: [],
        };

        this.handleSelectedChange = this.handleSelectedChange.bind(this);
        this.show = this.show.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userList) {
            this.setState({ data: nextProps.userList })
        }
    }

    handleSelectedChange(selectedRowKeys) {
        this.setState({ selectedRowKeys: selectedRowKeys });
    }

    show(user) {
        this.refs.editor.getWrappedInstance().show(user);
    }

    componentDidMount() {
        this.props.list();
    }

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '性别',
            dataIndex: 'sex',
        }, {
            title: '生日',
            dataIndex: 'birthday',
        }];

        const { selectedRowKeys, data, loading, modalError, modalUser, modalLoading, modalVisible } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelectedChange
        };
        const hasSelected = selectedRowKeys.length > 0 && !loading;
        const isSingleSelected = selectedRowKeys.length === 1 && !loading;

        return (
            <div>
                <div>
                    <Button type="primary" style={{ marginRight: '15px' }} onClick={() => this.show(undefined)}>新增</Button>
                    <Button type="primary" disabled={!isSingleSelected} style={{ marginRight: '15px' }}>修改</Button>
                    <Button type="primary" disabled={!hasSelected} style={{ marginRight: '15px' }}>删除</Button>
                </div>
                <UserEditor ref="editor" />
                <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} style={{ marginTop: '10px' }} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.UserReducer;
}

export default connect(mapStateToProps, UserAction)(UserManager)