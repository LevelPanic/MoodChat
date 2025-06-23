// src/screens/Tasks.tsx
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image, TextInput, Pressable, StyleSheet, Switch, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useGoogleTasks } from '@/hooks/useGoogleTasks';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import Profile from '@/components/icons/Profile';
import BottomBar from '@/components/BottomBar';
import TabContent from './tab';
import Cross from '@/components/icons/Cross';
import styles from '@/assets/styles';
import { useAuth } from '@/contexts/AuthContext';
import { Task, TaskForm, TaskWithPriority } from '@/types';
import { delay, getTimeSince, h, w } from '@/utils/helpers';
import { useLocalTaskMeta } from '@/contexts/LocalTasksContext';
import { deleteGoogleTask, submitTasks, updateGoogleTask } from '@/api/googletasks';

const Tab = createMaterialTopTabNavigator();

export default function Tasks() {
  const auth = useAuth();
  const authToken = auth.user?.token;
  const localTasksMeta = useLocalTaskMeta();
  const { data: tasks = [], isFetching, refetch } = useGoogleTasks(authToken!, localTasksMeta, auth.logout);

  const [localTasks, setLocalTasks] = useState(tasks);

  const refetchTasks = () => refetch().then(tasks => setLocalTasks(prev => [...tasks.data!]));

  const [form, setForm] = useState<TaskForm>({
    title: '',
    description: '',
    due: '',
    reminder: false,
  });

  const [comment, setComment] = useState('');
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(true);
  
  const [formType, setFormType] = useState('add');
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState<{value: string; createdAt: string} | undefined>();
  
  const refRBSheet = useRef<any>(null);
  const commentInputRef = useRef<TextInput>(null);
  
  const openSheet = () => 
    refRBSheet.current.open();

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const selectedDate = currentTask
    ? new Date(currentTask.due.split('-').reverse().join('-'))
    : new Date();

  const handleDatePickerChange = (_: any, d?: Date) => {
    setOpenDatePicker(Platform.OS === 'ios');
    if (d) {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      handleFormValues('due', `${dd}-${mm}-${yyyy}`);
    }
  };

  const getInquiries = async (item: Task) => {
    await delay(400);
    setCurrentTask(item);
    setLoading(false);
  };

  const handleTaskPress = (item: Task) => {
    setLoading(true);
    setCurrentTask(undefined);
    openSheet();
    getInquiries(item);
  }

  const handleTaskLongPress = (item: Task) => {
    setCurrentTask(item);
    setTaskModalVisible(true);
  }

  const toggleComplete = () => {
    if (currentTask) {
      let newStatus: "needsAction" | "completed" = currentTask.status === 'completed' ? 'needsAction' : 'completed';
      let newTask = {...currentTask, status: newStatus};
      localTasksMeta.updateMeta(currentTask.id, { status: newStatus });
      setCurrentTask(newTask);
      setLocalTasks([ ...localTasks.filter(t => t.id !== currentTask.id), newTask ]);
    }
  };

  const addComment = () => {
    if (!comment.trim()) return;
    if (currentTask) {
      let newComments = [...currentTask.comments, {value: comment.trim(), createdAt: String(Math.floor(Date.now()/1000))}];
      let newTask = {...currentTask, comments: newComments};
      localTasksMeta.updateMeta(currentTask.id, {comments: newComments});
      setCurrentTask(newTask);
      setLocalTasks([ ...localTasks.filter(t => t.id !== currentTask.id), newTask ]);
    }
    setComment('');
  };

  const removeComment = () => {
    if (currentTask) {
      let newComments = [...(currentTask.comments.filter(itm => itm.createdAt !== currentComment?.createdAt))]
      let newTask = {...currentTask, comments: newComments};
      localTasksMeta.updateMeta(currentTask.id, {comments: newComments});
      setCurrentTask(newTask)
      setLocalTasks([ ...localTasks.filter(t => t.id !== currentTask.id), newTask ])
    }
    setCurrentComment(undefined);
  };

  const editComment = () => {
    setComment(currentComment?.value!);
    removeComment();
    setTimeout(() => commentInputRef.current?.focus(), 500);
  };

  const removeTask = () => {
    deleteGoogleTask(auth.user?.token!, currentTask?.id!).then(check => {
      if (check) setLocalTasks([...localTasks.filter(t => t.id !== currentTask?.id)])
    });
    setCurrentTask(undefined)
  }

  const editTask = () => {
    setFormType('edit')
    setTaskFormVisible(true)
    handleFormValues('title', currentTask?.title!)
    handleFormValues('description', currentTask?.description!)
    handleFormValues('reminder', currentTask?.reminder!)
    handleFormValues('due', currentTask?.due!)
  }

  const resetForm = () => {
    handleFormValues('title', '')
    handleFormValues('description', '')
    handleFormValues('reminder', false)
    handleFormValues('due', '')
  }

  const handleSave = async () => {
    if (formType === 'add')
      await submitTasks([{
        id: '',
        title: form.title,
        description: form.description,
        due: form.due,
        reminder: form.reminder,
      }], auth.user?.token!).then(tasks => {
        if (tasks)
          setLocalTasks(prev => [...prev, ...tasks])
      })
    else if (formType === 'edit')
      await updateGoogleTask(auth.user?.token!, currentTask?.id!, {...form}).then(task => {
        if (task)
          setLocalTasks(prev => [...prev.filter(t => t.id !== task.id), task])
      })
    setTimeout(() => {
      resetForm();
      setTaskFormVisible(false);
      setCurrentTask(undefined)
    }, 200);
  }

  const handleFormValues = <K extends keyof TaskForm>(key: K, val: TaskForm[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleTaskFormClose = () => {
    setTaskFormVisible(false)
    resetForm()
  }

  useEffect(() => {
    setLocalTasks(tasks);
  }, [isFetching]);

  // Filter helper
  const filterBy = (p: TaskWithPriority['priority']) =>
    localTasks.filter((t) => t.priority === p);

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 70 }]}>
      <View
        style={[
          styles.container,
          styles.ph15,
          styles.pt15,
          { marginBottom: -10 },
        ]}
      >
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'transparent',
              shadowOpacity: 0,
              elevation: 0,
            },
            tabBarLabel: ({ children }) => (
              <Text style={{ color: '#fefdfe' }}>{children}</Text>
            ),
          }}
        >
          <Tab.Screen
            name="all"
            children={() => (
              <TabContent
                data={localTasks}
                handleTaskPress={handleTaskPress}
                handleTaskLongPress={handleTaskLongPress}
                loading={isFetching}
                refetch={refetchTasks}
              />
            )}
            options={{ title: 'All' }}
          />

          <Tab.Screen
            name="high"
            children={() => (
              <TabContent
                data={filterBy('high')}
                handleTaskPress={handleTaskPress}
                handleTaskLongPress={handleTaskLongPress}
                loading={isFetching}
                refetch={refetchTasks}
              />
            )}
            options={{
              title: 'High',
              tabBarIcon: () => (
                <View
                  style={{
                    backgroundColor: 'crimson',
                    borderRadius: 100,
                    height: 15,
                    width: 15,
                  }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="low"
            children={() => (
              <TabContent
                data={filterBy('low')}
                handleTaskPress={handleTaskPress}
                handleTaskLongPress={handleTaskLongPress}
                loading={isFetching}
                refetch={refetchTasks}
              />
            )}
            options={{
              title: 'Low',
              tabBarIcon: () => (
                <View
                  style={{
                    backgroundColor: '#3C8AFF',
                    borderRadius: 100,
                    height: 15,
                    width: 15,
                  }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="backlog"
            children={() => (
              <TabContent
                data={filterBy('backlog')}
                handleTaskPress={handleTaskPress}
                handleTaskLongPress={handleTaskLongPress}
                loading={isFetching}
                refetch={refetchTasks}
              />
            )}
            options={{
              title: 'Backlog',
              tabBarIcon: () => (
                <View
                  style={{
                    backgroundColor: 'linen',
                    borderRadius: 100,
                    height: 15,
                    width: 15,
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 25,
            bottom: 30,
            padding: 15,
            backgroundColor: '#16B293',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setFormType('add')
            setTaskFormVisible(true)
          }}
        >
          <View
            style={{
              transform: [
                { rotate: '45deg' },
                { translateX: 3 },
                { translateY: 3 },
              ],
            }}
          >
            <Cross fill="#fff" width={30} height={30} />
          </View>
        </TouchableOpacity>
      </View>

      <BottomBar />

      <RBSheet
        ref={refRBSheet}
        height={h(0.6)}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000004D',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#333642',
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
          // behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        }}>
        {loading ? (
          <ActivityIndicator
            color={'#1b7a6d'}
            size={'large'}
            style={[styles.flex1, styles.jcc]}
          />
        ) : (
          <>
            <View style={styles.p16}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={[styles.semiBold20, {color: '#baeadd'}]}>
                    {/* Task #{inquiry?.id} */}
                    {currentTask?.title}
                  </Text>
                  <Text
                    style={[styles.regular12, styles.mv10, {color: '#fefdfe'}]}
                    numberOfLines={3}>
                    {currentTask?.description === '' ? '...' : currentTask?.description}
                  </Text>
                  <Text
                    style={[styles.regular10, {color: '#aaa'}]}
                    numberOfLines={1}>
                    {currentTask?.due}
                  </Text>
                </View>
                <View style={{flexShrink: 1, padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={toggleComplete} style={{flex: 1, borderRadius: 10, height: 100, width: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#79b9aa'}}>
                    <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{currentTask?.status === 'completed' ? `Mark\nUndone` : `Mark\nDone`}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: '#baeadd11',
                  marginVertical: 12,
                }}
              />
              <Text style={[styles.semiBold16, {color: '#baeadd'}]}>
                Notes
              </Text>
              <View style={{height: 210}}>
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  showsVerticalScrollIndicator={false}
                  data={currentTask?.comments}
                  renderItem={({item}) => (
                    <TouchableOpacity activeOpacity={0.8} delayLongPress={100} onLongPress={() => {
                      setCommentModalVisible(true);
                      setCurrentComment(item)
                    }} style={styles.mt12}>
                      <View style={styles.fdr}>
                        {auth.user?.photo ? (
                          <Image
                            source={{uri: auth.user?.photo}}
                            style={[styles.widthHeight32, styles.br30]}
                          />
                        ) : (
                          <Profile width={32} height={32} />
                        )}
                        <View style={[styles.flex1, styles.ml12]}>
                          <View style={[styles.fdr, styles.jcsb, styles.itc]}>
                            <Text
                              style={[styles.medium10, {color: '#9a9b9a'}]}>
                              {getTimeSince(item?.createdAt)}
                            </Text>
                          </View>
                          <Text style={[styles.regular12, {color: '#fefdfe'}]}>
                            {item?.value}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View
              style={[
                styles.bw1,
                styles.mh15,
                styles.br8,
                styles.fdr,
                styles.itc,
                styles.jcsb,
                styles.ph15,
                styles.pv10,
                {
                  width: w(1) - 30,
                  position: 'absolute',
                  bottom: 15,
                  borderColor: '#555',
                },
              ]}>
              <TextInput
                ref={commentInputRef}
                placeholder="Write a comment here"
                placeholderTextColor={'#eaebea'}
                onChangeText={text => setComment(text)}
                style={{height: 44, flex: 3, color: 'white'}}
                value={comment}
              />
              <TouchableOpacity onPress={addComment} style={{flex: 1, backgroundColor: '#79b9aa', padding: 8, borderRadius: 8, alignItems: 'center'}}>
                <Text style={{color: 'white'}}>Add Note</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </RBSheet>

      <Modal
        isVisible={commentModalVisible}
        onBackdropPress={() => setCommentModalVisible(false)}
        swipeDirection={['down']}
        onSwipeComplete={() => setCommentModalVisible(false)}
        style={{justifyContent: 'flex-end', margin: 0}}
      >
        <View style={{
            backgroundColor: '#333642',
            paddingVertical: 16,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <Pressable style={{paddingVertical: 14, paddingHorizontal: 24}} onPress={() => {
            editComment();
            setCommentModalVisible(false);
          }}>
            <Text style={{fontSize: 16, color: '#fefdfe'}}>Edit Comment</Text>
          </Pressable>
          <Pressable style={{paddingVertical: 14, paddingHorizontal: 24}} onPress={() => {
            removeComment();
            setCommentModalVisible(false);
          }}>
            <Text style={{fontSize: 16, color: '#fefdfe'}}>Remove Comment</Text>
          </Pressable>
        </View>
      </Modal>

      
      <Modal
        isVisible={taskModalVisible}
        onBackdropPress={() => setTaskModalVisible(false)}
        swipeDirection={['down']}
        onSwipeComplete={() => setTaskModalVisible(false)}
        style={{justifyContent: 'flex-end', margin: 0}}
      >
        <View style={{
            backgroundColor: '#333642',
            paddingVertical: 16,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <Pressable style={{paddingVertical: 14, paddingHorizontal: 24}} onPress={() => {
            editTask();
            setTaskModalVisible(false);
          }}>
            <Text style={{fontSize: 16, color: '#fefdfe'}}>Edit Task</Text>
          </Pressable>
          <Pressable style={{paddingVertical: 14, paddingHorizontal: 24}} onPress={() => {
            removeTask();
            setTaskModalVisible(false);
          }}>
            <Text style={{fontSize: 16, color: '#fefdfe'}}>Remove Task</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        isVisible={taskFormVisible}
        onBackdropPress={handleTaskFormClose}
        onBackButtonPress={handleTaskFormClose}
        swipeDirection={['down']}
        onSwipeComplete={handleTaskFormClose}
        style={formStyles.modal}
      >
        <View style={formStyles.container}>
          <Text style={formStyles.header}>
            {formType !== 'add' ? 'Edit Task' : 'Add Task'}
          </Text>

          <TextInput
            style={formStyles.input}
            placeholder="Title"
            placeholderTextColor="#999"
            value={form.title}
            onChangeText={(t) => handleFormValues('title', t)}
          />

          <TextInput
            style={[formStyles.input, formStyles.textArea]}
            placeholder="Description"
            placeholderTextColor="#999"
            value={form.description}
            onChangeText={(t) => handleFormValues('description', t)}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
            <Text style={formStyles.input}>{form.due !== '' ? form.due : "Date (DD-MM-YYYY)"}</Text>
          </TouchableOpacity>

          <View style={formStyles.switchRow}>
            <Text style={formStyles.switchLabel}>Reminder</Text>
            <Switch
              value={form.reminder}
              onValueChange={(v) => handleFormValues('reminder', v)}
            />
          </View>

          <View style={formStyles.buttons}>
            <Pressable style={[formStyles.btn, formStyles.cancel]} onPress={handleTaskFormClose}>
              <Text style={formStyles.btnText}>Cancel</Text>
            </Pressable>
            <Pressable style={[formStyles.btn, formStyles.save]} onPress={handleSave}>
              <Text style={[formStyles.btnText, formStyles.saveText]}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {openDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDatePickerChange}
        />
      )}
      
    </SafeAreaView>
  );
}

const formStyles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  container: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#333642',
    borderRadius: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2e2f3b',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
  },
  cancel: {
    backgroundColor: '#4a4a4a',
  },
  save: {
    backgroundColor: '#4caf50',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  saveText: {
    fontWeight: '600',
  },
});
