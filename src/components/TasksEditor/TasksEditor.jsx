import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Row,
  Col,
  Button,
  Collapse,
  Typography,
  Form,
  Input,
  Card,
  message,
} from 'antd'
import InputNumber from 'antd/es/input-number'
import {
  PlusOutlined,
  DeleteOutlined,
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons'

import './TasksEditor.css'
import BottomArrow from '../shared/Icons/BottomArrow'
import RightArrow from '../shared/Icons/RightArrow'
import SalyExplorerIcon from '../shared/Icons/SalyExplorerIcon'

import {
  postWithToken,
  deleteWithToken,
} from '../../application/api/BackendApi/CommonApi'
import { BASE_URL } from '../../settings'

const { Panel } = Collapse
const { Title } = Typography

export default function TasksEditor(props) {
  // const [form] = Form.useForm()
  const [groupsCount, setGroupsCount] = useState(
    Object.keys(props.tasks).length
  )
  const [newGroup, setNewGroup] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [newTaskOfGroups, setNewTaskOfGroups] = useState({})
  const [initialValues, setInitialValues] = useState({})
  const [stateTasks, setStateTasks] = useState(props.tasks)

  const handleDeleteGroup = (e, group) => {
    e.stopPropagation()
    stateTasks[group].map((task) => _deleteTask(group, task.id))
    setStateTasks(...stateTasks.filter((el, i) => i !== group))
    setGroupsCount(groupsCount - 1)
    document.location.reload()

    // TODO: в первую очередь спрятать раздел, чтобы он не раскрылся
    // TODO: удалить все задачи внутри раздела
  }

  const handleAddGroup = () => {
    setGroupsCount(groupsCount + 1)
    setNewGroup(true)
    // TODO: добавить новый DOM-элемент
  }

  const handleDeleteTask = (group, taskId) => {
    // TODO:
  }

  const handleDeleteTaskInForm = () => {
    setNewTaskOfGroups({})
    setInitialValues({})
    // TODO: очистить форму
  }

  const handleAddTask = (e, group) => {
    e.stopPropagation()
    setNewTaskOfGroups({ [group]: true })
    // props.tasks[group].push({
    //   id: 7,
    //   name: 'Просто задание 7',
    //   reward: 7,
    //   manualVerificationEnabled: false,
    //   question: '7',
    //   group: group,
    //   hintsCount: 1,
    //   usedHints: [],
    //   lastSubmittedAnswer: null,
    //   status: 'notsubmitted',
    //   adminComment: null,
    //   videoUrl: null,
    //   hints: ['5', '6', '7'],
    //   correctAnswers: ['7'],
    // })
    // TODO:
  }

  const handleAddCopy = (task) => {
    setNewTaskOfGroups({ [task.group]: true })
    setInitialValues(task)
  }

  const handleApplyName = (e) => {
    e.stopPropagation()
    // TODO: НАДО КЛЮЧИ НОРМАЛЬНЫЕ ДЕЛАТЬ
    if (stateTasks[inputValue]) {
      message.error('Такой раздел уже существует')
    } else {
      setStateTasks({ ...stateTasks, [inputValue]: [] })
      setNewGroup(false)
    }
    // TODO:
  }

  /**
   * Preprocess values and send the request to add task.
   * If request is successful -> refetch the tasks page
   * Else -> show the notification
   * @param {{}} values
   * @private
   */
  const _addTask = (values) => {
    const payload = {}

    payload.name = values.name
    payload.reward = values.reward
    payload.verificationIsManual = false
    payload.question = values.question
    payload.correctAnswer = values.correctAnswer
    payload.group = values.group || 'Задания' // If group not set default to this
    payload.hints = [values.hint_1, values.hint_2, values.hint_3].filter(
      (x) => typeof x === 'string' && x.length > 0
    )

    console.log(payload)

    return postWithToken(
      `${BASE_URL}/quests/${props.questId}/tasks`,
      payload
    ).then((r) => {
      // console.log(r, r.json())
      if (r.status > 199 && r.status < 400) {
        message.success('Все чики-пуки')
        // TODO: убрать этот костылb
        r.json().then((id) => (payload.id = id))
        payload.correctAnswers = payload.correctAnswer.split(';')
        setStateTasks({ ...stateTasks, [payload.group]: payload })
        setNewTaskOfGroups({})
        document.location.reload()

        // TODO: доделать нормально
        // r.json().then(props.tasks.push('…'))
      } else {
        r.json().then((json) =>
          message.error('Что-то пошло не так: ' + json.title)
        )
      }
    })
  }

  const _deleteTask = (group, taskId) => {
    const objId = stateTasks[group].findIndex((el) => el.id === taskId)
    // TODO: проверить на корректность
    // const newObj = {}
    const oldObj = Object.keys(stateTasks).map((i) =>
      i === group ? stateTasks[i].filter((el, i) => i !== objId) : stateTasks[i]
    )
    // for (var [key, value] of oldObj) newObj[key] = value
    // console.log(oldObj, newObj)
    setStateTasks(oldObj)

    deleteWithToken(`${BASE_URL}/quests/${props.questId}/tasks/${taskId}`).then(
      (r) => r.json().then((json) => console.log(json))
    )
    document.location.reload()
  }

  // TODO: Вынести здесь и в других файлах inline-стили в отдельный файл
  return !groupsCount ? (
    <>
      <Row
        justify='center'
        style={{ textAlign: 'center', fontSize: '16px', marginTop: '16px' }}
      >
        У каждого задания есть название, условие, максимум три подсказки и
        ответ.
        <br /> Задания группируются по разделам.
        <br /> Чтобы начать добавлять задания, создайте первый раздел
      </Row>
      <Row justify='center'>
        <Col style={{ marginTop: '38px', marginRight: '12px' }}>
          <Button type='primary' onClick={handleAddGroup}>
            + Добавить раздел
          </Button>
        </Col>
        <Col style={{ marginRight: '-108px' }}>
          <svg
            width='96'
            height='74'
            viewBox='0 0 96 74'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.395802 57.8542C-0.199454 56.9681 0.0362523 55.7673 0.922266 55.1721L15.3607 45.4718C16.2467 44.8766 17.4475 45.1123 18.0428 45.9983C18.638 46.8843 18.4023 48.0851 17.5163 48.6804L4.68214 57.3028L13.3046 70.137C13.8998 71.023 13.6641 72.2238 12.7781 72.819C11.8921 73.4143 10.6913 73.1786 10.0961 72.2926L0.395802 57.8542ZM92.1977 1.78991C92.5899 0.79717 93.7126 0.310324 94.7054 0.702512C95.6981 1.0947 96.185 2.21741 95.7928 3.21015L92.1977 1.78991ZM95.7928 3.21015C89.6756 18.6945 79.5485 35.1763 64.2014 46.4916C48.7911 57.8535 28.2552 63.8995 1.62781 58.6729L2.37234 54.8798C27.963 59.903 47.3914 54.083 61.9075 43.3804C76.4868 32.6312 86.2482 16.8498 92.1977 1.78991L95.7928 3.21015Z'
              fill='#40A9FF'
            />
          </svg>
        </Col>
      </Row>
    </>
  ) : (
    <div className='groups'>
      <Collapse
        bordered={false}
        expandIcon={(value) =>
          value.isActive ? <BottomArrow /> : <RightArrow />
        }
        className='collapse'
      >
        {console.log(props.tasks)}
        {Object.keys(stateTasks).map((x) => (
          <Panel
            name={encodeURI(x)}
            header={
              <div className='collapse__header'>
                <Title
                  level={3}
                  style={{ marginBottom: 0, marginLeft: '10px' }}
                >
                  {x}
                </Title>
                <div>
                  <Button
                    type='primary'
                    ghost
                    danger
                    icon={<DeleteOutlined />}
                    style={{ marginRight: '16px' }}
                    onClick={(e) => handleDeleteGroup(e, x)}
                  >
                    Удалить раздел
                  </Button>
                  <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    group={x}
                    onClick={(e) => handleAddTask(e, x)}
                  >
                    Добавить задание
                  </Button>
                </div>
              </div>
            }
            key={x}
          >
            {stateTasks[x][0]
              ? stateTasks[x].map((task) => (
                  <div className='task'>
                    <div>
                      <Title level={4}>{task.name}</Title>
                      <p>
                        <b>Награда:</b> {task.reward}
                      </p>
                      <ReactMarkdown>{task.question}</ReactMarkdown>
                      <div className='hints' style={{ padding: 0 }}>
                        {task.hints.map((hint, i) => (
                          <Card
                            style={{
                              width: 245,
                              borderRadius: '4px',
                              marginBottom: '22px',
                              marginRight: '16px',
                            }}
                          >
                            <b>{`Подсказка ${i + 1}:`}</b>
                            <p>{hint}</p>
                          </Card>
                        ))}
                      </div>
                      <p>
                        {console.log(task, props.tasks)}
                        <b>Ответ:</b> {task.correctAnswers.join(';')}
                      </p>
                    </div>
                    <div className='task__controls'>
                      <Button
                        type='primary'
                        ghost
                        icon={<CopyOutlined />}
                        style={{ marginBottom: '16px' }}
                        onClick={() => handleAddCopy(task)}
                        taskId={task.id}
                        group={x}
                      >
                        Создать копию
                      </Button>
                      <Button
                        type='primary'
                        ghost
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => _deleteTask(x, task.id)}
                        taskId={task.id}
                        group={x}
                      >
                        Удалить задание
                      </Button>
                    </div>
                  </div>
                ))
              : !newTaskOfGroups[x] && (
                  <div className='empty-group'>
                    <SalyExplorerIcon />
                    <div className='empty-group__info'>
                      <p>
                        В этом разделе пусто
                        <br />
                        <b>Давайте создадим первое задание</b>
                      </p>
                      <svg
                        width='340'
                        height='255'
                        viewBox='0 0 340 255'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M2.00808 250.565C0.939418 250.561 0.069479 251.423 0.0650169 252.492C0.0605549 253.561 0.923259 254.431 1.99192 254.435L2.00808 250.565ZM326.868 1.13175C326.113 0.376084 324.887 0.376084 324.132 1.13175L311.817 13.446C311.062 14.2017 311.062 15.4269 311.817 16.1825C312.573 16.9382 313.798 16.9382 314.554 16.1825L325.5 5.2365L336.446 16.1825C337.202 16.9382 338.427 16.9382 339.183 16.1825C339.938 15.4269 339.938 14.2017 339.183 13.446L326.868 1.13175ZM1.99192 254.435C242.587 255.44 327.435 93.5485 327.435 2.5H323.565C323.565 91.4515 240.413 251.56 2.00808 250.565L1.99192 254.435Z'
                          fill='#69C0FF'
                        />
                      </svg>
                    </div>
                  </div>
                )}
            {console.log('HEY', x, newTaskOfGroups[x], initialValues)}
            {newTaskOfGroups[x] && (
              <div className='task'>
                <Form
                  // form={form}
                  layout='vertical'
                  name='create-task-form'
                  onFinish={_addTask}
                  requiredMark={false}
                  className='create-task-form'
                >
                  <Form.Item
                    label='Название задания'
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Это поле обязательно',
                      },
                    ]}
                    initialValue={
                      Object.keys(initialValues).length
                        ? initialValues.name
                        : undefined
                    }
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='reward'
                    label='Награда'
                    rules={[
                      {
                        required: true,
                        message: 'Пожалуйста укажите награду',
                      },
                    ]}
                    initialValue={
                      Object.keys(initialValues).length
                        ? initialValues.reward
                        : undefined
                    }
                  >
                    <InputNumber min={0} max={1000} />
                  </Form.Item>
                  <div className='description'>
                    <Form.Item
                      label='Условие задания'
                      name='question'
                      rules={[
                        {
                          required: true,
                          message: 'Это поле обязательно',
                        },
                      ]}
                      initialValue={
                        Object.keys(initialValues).length
                          ? initialValues.question
                          : undefined
                      }
                    >
                      <Input.TextArea autoSize={{ minRows: 4 }} />
                    </Form.Item>
                    <p>Поддерживаем Markdown</p>
                  </div>
                  <div className='form-hints'>
                    <div>
                      <Form.Item
                        label='Подсказка 1'
                        name='hint_1'
                        initialValue={
                          Object.keys(initialValues).length
                            ? initialValues.hints[0]
                            : undefined
                        }
                      >
                        <Input.TextArea autoSize={{ minRows: 4 }} />
                      </Form.Item>
                      <Form.Item
                        label='Подсказка 2'
                        name='hint_2'
                        initialValue={
                          Object.keys(initialValues).length
                            ? initialValues.hints[1]
                            : undefined
                        }
                      >
                        <Input.TextArea autoSize={{ minRows: 4 }} />
                      </Form.Item>
                      <Form.Item
                        label='Подсказка 3'
                        name='hint_3'
                        initialValue={
                          Object.keys(initialValues).length
                            ? initialValues.hints[2]
                            : undefined
                        }
                      >
                        <Input.TextArea autoSize={{ minRows: 4 }} />
                      </Form.Item>
                    </div>
                    <p>Если подсказка не нужна, оставьте её пустой</p>
                  </div>
                  <div className='answer'>
                    <Form.Item
                      label='Ответ'
                      name='correctAnswer'
                      rules={[
                        {
                          required: true,
                          message: 'Это поле обязательно',
                        },
                      ]}
                      initialValue={
                        Object.keys(initialValues).length
                          ? initialValues.correctAnswers
                          : undefined
                      }
                    >
                      <Input />
                    </Form.Item>
                    <p>Несколько ответов пишите через точку с запятой</p>
                  </div>
                  <Form.Item
                    name='group'
                    initialValue={x}
                    hidden={true}
                  ></Form.Item>
                  <div className='form-controls'>
                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        style={{ background: '#52C41A', border: 'none' }}
                      >
                        Сохранить изменения
                      </Button>
                    </Form.Item>
                    <Button
                      type='primary'
                      ghost
                      danger
                      icon={<DeleteOutlined />}
                      onClick={handleDeleteTaskInForm}
                    >
                      Удалить задание
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Panel>
        ))}
        {newGroup && (
          <Panel
            name='empty'
            key='empty'
            header={
              <Input.Group
                compact
                style={{
                  marginLeft: '10px',
                  display: 'flex',
                  maxWidth: '500px',
                }}
              >
                <Input
                  placeholder={'Введите название раздела квеста'}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  type='primary'
                  icon={<CheckOutlined />}
                  onClick={handleApplyName}
                ></Button>
              </Input.Group>
            }
          ></Panel>
        )}
      </Collapse>
      {!newGroup && (
        <Button
          type='primary'
          ghost
          icon={<PlusOutlined />}
          onClick={handleAddGroup}
        >
          Добавить раздел
        </Button>
      )}
    </div>
  )
}
