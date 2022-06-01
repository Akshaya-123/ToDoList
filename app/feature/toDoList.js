import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';

import Header from '../components/header';
import {colors} from '../utils/colors';

import {strings} from '../utils/strings';

function ToDoList() {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState();
  const [flatListData, setFlatListData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [remainingData, setRemainingData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [tab, setTab] = useState(0);

  const {all, completed, add, remaining} = strings;

  const onAddItem = () => {
    if (item) {
      const copiedData = [...flatListData];
      copiedData.push({isChecked: false, name: item, isDelete: false});
      setFlatListData(copiedData);
      setItem();
      toggleModal(false);
    }
  };

  const deleteRow = selectedItem => {
    const filteredData = flatListData.filter(x => x.name !== selectedItem.name);
    setFlatListData(filteredData);
  };

  const onCheckBoxMethod = selectedItem => {
    const checkedData = flatListData.findIndex(
      x => x.name === selectedItem.name,
    );
    let copyData = [...flatListData];
    copyData[checkedData].isChecked = !copyData[checkedData].isChecked;
    setFlatListData(copyData);
  };

  const completedList = () => {
    const filteredCheckedList = flatListData.filter(x => x.isChecked === true);
    setCompletedData(filteredCheckedList);
  };

  const unCompletedList = () => {
    const filteredUncheckedList = flatListData.filter(
      x => x.isChecked === false,
    );
    setRemainingData(filteredUncheckedList);
  };

  const renderItem = ({item}) => (
    <View style={styles.contentRow}>
      <View style={styles.checkboxView}>
        {item.isChecked ? (
          <Fontisto
            onPress={() => onCheckBoxMethod(item)}
            name="checkbox-active"
            size={20}
            color={colors.white}
          />
        ) : (
          <Fontisto
            onPress={() => onCheckBoxMethod(item)}
            name="checkbox-passive"
            size={20}
            color={colors.white}
          />
        )}
      </View>
      <View style={styles.nameView}>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.deleteIcon}>
        <Icon
          onPress={() => deleteRow(item)}
          name="delete"
          size={20}
          color={colors.themeColor}
        />
      </View>
    </View>
  );

  const onSearch = text => {
    if (text?.length > 2) {
      const filteredData = flatListData.filter(x => x.name.includes(text));
      setTab(3);
      setSearchData(filteredData);
    } else {
      setSearchData();
      setTab(0);
    }
  };

  const toggleModal = flag => {
    setVisible(flag);
  };

  const getData = () => {
    switch (tab) {
      case 0:
        return flatListData;
      case 1:
        return completedData;
      case 2:
        return remainingData;
      default:
        return searchData;
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.contentView}>
        <Header />
        <View style={{margin: 10}}>
          <TextInput
            placeholder={'Search...'}
            placeholderTextColor={colors.white}
            style={styles.searchTextInput}
            onChangeText={text => onSearch(text)}
          />
        </View>
        <FlatList data={getData()} renderItem={renderItem} />
      </View>
      <View style={styles.itemContent}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{flex: 0.1}}
            onPress={() => toggleModal(true)}>
            <Icon name="add" size={20} color={colors.black} />
          </TouchableOpacity>
          <View style={{flex: 0.4}}>
            <Text style={styles.countText}>{flatListData?.length} Items</Text>
          </View>
          <View style={styles.tabView}>
            <Text
              style={styles.allText}
              onPress={() => {
                setTab(0);
              }}>
              {all}
            </Text>

            <Text
              style={styles.completedText}
              onPress={() => {
                setTab(1);
                completedList();
              }}>
              {completed}
            </Text>

            <Text
              onPress={() => {
                setTab(2);
                unCompletedList();
              }}
              allowFontScaling={false}
              style={styles.remainingText}>
              {remaining}
            </Text>
          </View>
        </View>
      </View>
      <Modal isVisible={visible} onBackdropPress={() => toggleModal(false)}>
        <View style={{backgroundColor: colors.white, padding: 10}}>
          <TextInput
            placeholder={'Add an item...'}
            placeholderTextColor={colors.black}
            value={item}
            onChangeText={setItem}
            style={styles.addInput}
          />
          <TouchableOpacity onPress={onAddItem} style={styles.addBtn}>
            <Text style={{color: colors.black, fontSize: 12}}>{add}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.black,
  },
  contentView: {
    flex: 0.95,
  },
  checkboxView: {
    flex: 0.1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginHorizontal: 20,
  },
  nameView: {
    flex: 0.7,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
  },
  deleteIcon: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  addBtn: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '20%',
    alignSelf: 'flex-end',
  },
  addInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.black,
    color: colors.black,
    borderRadius: 5,
  },
  searchTextInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.themeColor,
    color: colors.white,
    borderRadius: 5,
  },
  itemContent: {
    flex: 0.075,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.themeColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
  tabView: {
    flex: 0.6,
    flexDirection: 'row',
  },
  remainingText: {
    padding: 10,
    borderWidth: 0.75,
    color: colors.black,
    fontSize: 14,
  },
  completedText: {
    padding: 12,
    borderWidth: 0.75,
    color: colors.black,
    fontSize: 14,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  allText: {
    padding: 10,
    borderWidth: 0.75,
    color: colors.black,
    fontSize: 14,
  },
});

export default ToDoList;
