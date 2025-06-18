import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
  },
  backIcon: {
    marginRight: 10,
    marginLeft: 5,
  },
  callIcon: {
    marginRight: 5
  },
  optionsIcon: {
    marginLeft: 15,
    marginRight: 5
  },
  attachBtn: {
    marginRight: 15
  },
  micIcon: {
    marginRight: 5
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  profileBtn: {
    flex: 1,
    flexDirection: 'row'
  },
  profileDetails: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 5
  },
  profileName: {
    flex: 1,
    fontSize: 15,
    color: "#000"
  },
  profileType: {
    flex: 1,
    fontSize: 11,
    color: "#000"
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  chatBody: {
    zIndex: 1,
    flexGrow: 1,
    padding: 10,
    paddingBottom: 30,
    // backgroundColor: "#D0D0D0"
  },

  // Messages
  messageBubble: {
    maxWidth: '70%',
    minWidth: '30%',
    flexDirection: 'column',
    flexShrink: 1,
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#094E35',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
  },
  messageText: {
    fontSize: 16,
    color: "#EFEFEF"
  },
  timestamp: {
    color: '#aaa',
    marginTop: 3,
    marginBottom: -5,
    fontSize: 10,
    width: '100%', 
    alignSelf: 'flex-end',
    textAlign: 'right'
  },

  // Text Message
  textMessage: {
    paddingHorizontal: 10,
  },

  // Document Message (with an icon and filename display)
  documentMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e8f0fe',
  },
  documentIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: '#4285f4', // Google blue for a document feel
  },
  documentText: {
    fontSize: 16,
    color: '#4285f4',
  },

  // Media Message (Image/Video preview with a border)
  mediaMessage: {
    padding: 2,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  mediaImage: {
    width: 200,
    height: 150,
    borderRadius: 15,
  },

  // Audio Message (with a play button and time display)
  audioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
  },
  audioPlayButton: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    tintColor: '#4285f4',
  },
  audioDurationText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 12,
    backgroundColor: '#222531',
  },
  textInput: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#111420',
    color: '#fefdfe',
    marginRight: 10,
  },
  sendButton: {
    paddingHorizontal: 10
  },
  menuContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  menuOption: {
    fontSize: 18,
    color: '#FFF',
    marginVertical: 15,
  },
  separator: {
    width: '50%',
    borderBottomWidth: 0.5,
    borderColor: '#444'
  },


  // Task Sheet Styles
  sheetContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sheetSubmit: {
    borderTopWidth: 0.5,
    borderColor: '#4a4a4a',
    width: '100%',
    height: 80,
    padding: 16
  },
  sheetSubmitBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#287156',
    borderRadius: 15
  },
  sheetSubmitBtnDisabled: {
    backgroundColor: '#144028',
    borderWidth: 1,
    borderColor: '#1f6a4d'
  },
  sheetSubmitBtnTxt: {
    fontSize: 16,
    color: '#FFF'
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: '#555555',
    marginBottom: 12,
    borderRadius: 15,
    padding: 12,
    backgroundColor: '#121212',
  },
  taskBtn: {
    flexDirection: 'row'
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#EFEFEF'
  },
  blockStart: {
    marginBottom: 12,
  },
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#EFEFEF'
  },
  blockFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4caf50',
  },
  radioSelected: {
    borderColor: '#4caf50',
  },
  radioLabel: {
    fontSize: 14,
    color: '#EFEFEF'
  },
});

export default styles;
