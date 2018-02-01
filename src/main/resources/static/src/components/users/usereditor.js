import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as UserAction from '../../actions/useraction'
import moment from 'moment'
import { Modal, Input, DatePicker, Radio, Alert, Button } from 'antd'
const RadioGroup = Radio.Group
import PropTypes from 'prop-types'
import './usereditor.scss'

class UserEditor extends Component {

    _user;

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            error: '',
            visible: false,
            loading: false,
            name: '',
            sex: 0,
            birthday: new Date(),
            address: ''
        };

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('props', nextProps);
    }

    show(user) {
        this._user = user;
        if (typeof this._user === 'undefined') {
            this.setState({
                title: '新增用户',
                error: '',
                visible: true,
                loading: false,
                name: '',
                sex: 0,
                birthday: new Date(),
                address: '',
            });
        } else {
            this.setState({
                title: '修改用户',
                error: '',
                visible: true,
                loading: false,
                name: this._user.name,
                sex: this._user.sex,
                birthday: this._user.birthday,
                address: this._user.address
            });
        }
    }

    handleChange(name, value) {
        this.setState({ [name]: value });
    }

    handleOk() {
        if (typeof this._user === 'undefined') {
            let { name, sex, birthday, address } = this.state;
            this._user = { name, sex, birthday, address };
        } else {
            let { name, sex, birthday, address } = this.state;
            this._user.name = name;
            this._user.sex = sex;
            this._user.birthday = birthday;
            this._user.address = address;
        }
        this.setState({ loading: true, })
        this.props.save(this._user)
    }

    handleCancel() {
        this.setState({ visible: false });
        this.props.onClose();
    }

    render() {
        let { title, error, visible, loading, name, sex, birthday, address } = this.state;
        return (
            <div>
                <Modal title={title} visible={visible} closable={false} loading={loading ? loading : false}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确定</Button>
                    ]} >
                    <div className='alert'>
                        {
                            typeof error === 'string' && error !== '' ?
                                <Alert message={error} type="error" closable={true} style={{ marginBottom: '20px' }} />
                                : null
                        }
                    </div>
                    <div className='user'>
                        <div>姓名：</div>
                        <div>
                            <Input value={name} onChange={e => this.handleChange('name', e.target.value)} />
                        </div>
                        <div>性别：</div>
                        <div>
                            <RadioGroup name="sex" value={sex} onChange={e => this.handleChange('sex', e.target.value)}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                                <Radio value={0}>保密</Radio>
                            </RadioGroup>
                        </div>
                        <div>生日：</div>
                        <div>
                            <DatePicker format="YYYY-MM-DD" allowClear={false} value={moment(birthday)} onChange={e => this.handleChange('birthday', e.toDate())} />
                        </div>
                        <div>地址：</div>
                        <div>
                            <Input value={address} onChange={e => this.handleChange('address', e.target.value)} />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

UserEditor.propTypes = {
    onClose: PropTypes.func,
}

const mapStateToProps = (state) => {
    return state.UserReducer;
}

export default connect(mapStateToProps, UserAction, null, { withRef: true })(UserEditor)