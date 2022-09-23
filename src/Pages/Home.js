import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Alert, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../Components/Button';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, storageRef, storage, listAll } from 'firebase/storage';
import { initializeApp, getDownloadURL, firebase } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import uuid from 'react-native-uuid';


const Home = ({ navigation }) => {
  initializeApp(firebaseConfig);

  const theme = useSelector((state) => state.theme.theme);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [im, sets] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    //console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      //console.log(result.uri);
    }
  };


  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
    console.log(blob);
    const storage = getStorage();
    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    Alert.alert("Image shared");
    setImage(null);
  };


  function listImages() {
    const storage = getStorage();
    const listRef = ref(storage, '/');
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          //gelen veriyi alabilmek için belirli bir formata uyarladım
          const url = "https://firebasestorage.googleapis.com/v0/b/" + itemRef.bucket + "/o/" + itemRef.fullPath + "?alt=media&token=abf69362-2762-4b5d-8532-0e55fd6dd0ad";
          //setImageList(url);
          console.log(url);
          setImageList((prev) => [...prev, url]);
          /* getDownloadURL(itemRef).then((url) => {
             setImageList((prev) => [...prev, url]);
           });*/
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.header_text, { color: theme.color }]}>Share image</Text>
      <View>
        <Button title="Select from gallery" onPress={pickImage} />
        <Button title="Display images" onPress={listImages} />
      </View>
      <View>
        {image &&
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: image }} style={styles.image} />
            <Button title="Share image" onPress={uploadImage} />
          </View>
        }
        <View>
          <Text>
            sa
          </Text>
          {/* <Image
            style={styles.image}
            source={{
              uri: imageList[1]//'https://firebasestorage.googleapis.com/v0/b/snapchatapp-de814.appspot.com/o/b8b40622-f1e1-4c73-8f50-840bdd85266b?alt=media&token=abf69362-2762-4b5d-8532-0e55fd6dd0ad'
            }}
          />
          <Image source={require("https://firebasestorage.googleapis.com/v0/b/snapchatapp-de814.appspot.com/o/b8b40622-f1e1-4c73-8f50-840bdd85266b?alt=media&token=abf69362-2762-4b5d-8532-0e55fd6dd0ad")} style={styles.image} />*/}

          {imageList &&
            <FlatList
              data={imageList}
              renderItem={({ item }) => <Image source={{ uri: item.toString() }} style={styles.image} />} />
          }
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header_text:
  {
    fontWeight: '800',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  image:
  {
    width: 200,
    height: 300,
    marginBottom: 10
  },
});

export default Home;