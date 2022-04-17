import React, { useState, useEffect } from "react"
import SeeMore from 'react-native-see-more-inline';
import stylesGeneral from "../../components/style"
import styles from './style'
import { Rating } from 'react-native-ratings'
import { db } from "../../../firebase"
import { ActivityIndicator, View, Text, FlatList, Keyboard, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { collection, getDocs, query, where } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";


export const Comments = (props) => {

  const id = props.route.params.parking.id
  const isFocused = useIsFocused()
  const [comments, setComments] = useState(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState(null)

  const myquery = query(
    collection(db, "comments"),
    where("parkingId", "==", id)
  );

  async function getComments() {
    const commentslist = [];
    const commentssnapshot = await getDocs(myquery);
    commentssnapshot.forEach((doc) => {
      commentslist.push({ ...doc.data(), key: doc.id });
    });
    setComments(commentslist)
    //console.log(comments)
  }

  async function getUsers() {
    const users = []
    const snapshot = await getDocs(query(
      collection(db, "users")))
    snapshot.forEach((doc) => {
      users.push({ ...doc.data(), key: doc.id })
    });
    setUsers(users)
  }

  useEffect(() => {
    getComments()
    getUsers()
    setLoading(false)
  }, [isFocused])

  function checkUser(userId) {
    let name = ""
    users.map((_user) => {
      if (userId.localeCompare(_user.userUid) == 0) {
        name = _user.name
      }
    });
    return name
  }

  if (loading || users == null) {
    return <ActivityIndicator></ActivityIndicator>
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.containerForm}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.containerForm}>
              <TouchableOpacity style={styles.card}>
                <Text>Usuário: {checkUser(item.userId)}</Text>
                <SeeMore numberOfLines={3} seeLessText='Leia mais'>
                  {item.comment}
                </SeeMore>
                <Rating
                  style={styles.barRating}
                  type='star'
                  ratingCount={5}
                  startingValue={item.rating}
                  imageSize={30}
                  readonly={true} />
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={stylesGeneral.button}
          onPress={() => props.navigation.navigate('NewComment', props.route.params.parking)}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}> Adicionar Comentário </Text>
        </TouchableOpacity>
      </View>

    </TouchableWithoutFeedback>
  );
}
