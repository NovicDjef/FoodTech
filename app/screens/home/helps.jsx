import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Helps = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Bonjour, comment puis-je vous aider?', sender: 'receiver' },
    { id: '2', text: 'J\'ai une question sur votre produit.', sender: 'sender' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { id: Date.now().toString(), text: newMessage, sender: 'sender' };
      setMessages([...messages, userMessage]);
      setNewMessage('');

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: `User: ${newMessage}\nBot:`,
            max_tokens: 150,
            n: 1,
            stop: ['\n', ' User:', ' Bot:'],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            },
          }
        );

        const botMessage = response.data.choices[0].text.trim();
        const newBotMessage = { id: Date.now().toString(), text: botMessage, sender: 'receiver' };
        setMessages(prevMessages => [...prevMessages, newBotMessage]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'sender' ? styles.senderContainer : styles.receiverContainer]}>
      <Text style={[styles.messageText, item.sender === 'sender' ? styles.senderText : styles.receiverText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>{t("Submit_complaint")}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("Submit_complaint")}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="paper-plane-outline" style={{ color: COLORS.white, fontSize: 24 }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  messageList: {
    flex: 1,
  },
  messageListContainer: {
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
    textAlign: 'center',
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderTopEndRadius: 22,
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
    marginVertical: 5,
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gray30,
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: COLORS.white,
  },
  receiverText: {
    color: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 12,
    marginLeft: 10,
    flexDirection: 'row',
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    top: 4,
  },
});

export default Helps;
