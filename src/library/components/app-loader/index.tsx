import {lightColors} from '@themes/colors/light';
import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

class AppLoader extends Component {
  static __singletonRef: any;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    AppLoader.__singletonRef = this;
    this.state = {
      loading: false,
    };
  }

  static show() {
    AppLoader.__singletonRef.__show();
  }

  static hide() {
    AppLoader.__singletonRef.__hide();
  }

  static setVisible(loading: boolean) {
    if (loading === true) {
      AppLoader.__singletonRef.__show();
    } else {
      AppLoader.__singletonRef.__hide();
    }
  }

  __show() {
    this.setState({loading: true});
  }
  __hide() {
    this.setState({loading: false});
  }

  render() {
    const {loading}: any = this.state;
    if (!loading) {
      return null;
    }
    return (
      // <Modal
      //     transparent={true}
      //     animationType={'none'}
      //     visible={loading}
      //     onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            color={lightColors.white}
            animating={loading}
            size="large"
          />
        </View>
      </View>
      // </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: lightColors.translusent,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: lightColors.transparent,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppLoader;
