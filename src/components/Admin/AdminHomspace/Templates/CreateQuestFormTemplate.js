import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  Upload,
  Modal,
  message,
} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import TextArea from 'antd/es/input/TextArea'
import './CreateQuestFormTemplate.css'
import InputNumber from 'antd/es/input-number'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import SalyDownloadIcon from '../../../shared/Icons/SalyDownloadIcon'

const { RangePicker } = DatePicker

export default function CreateQuestFormTemplate({
  submitFunction,
  isEditable,
  quest,
}) {
  const onFinish = (values) => {
    submitFunction(values)
  }

  const [disabled, setDisabled] = useState(
    isEditable ? !quest.isRegistrationLimited : null
  )
  const handleDeadlineChange = (value) => {
    if (value === 'withoutDeadline') setDisabled(true)
    else setDisabled(null)
  }

  const [name, setName] = useState(isEditable ? quest.name : 'Мой новый квест')
  const handleNamePreviewChange = (e) => {
    const trimValue = e.target.value.trim()
    if (trimValue !== '') setName(trimValue)
    else setName('Мой новый квест')
  }

  // TODO: придумать, что делать, когда грузят не изображение. Возможно ли такое?
  // TODO: пофиксить баг с двойной загрузкой (если еще есть)
  const [image, setImage] = useState(isEditable ? quest.imageUrl : null)
  const [deleteImage, setDeleteImage] = useState(false)
  const handleImagePreviewChange = (e) => {
    console.log('HANDLE', e)
    const file = e.file.originFileObj
    if (file && e.fileList.length !== 0) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVisible(false)
        setImage(reader.result)
        form.setFieldsValue({ image: reader.result })
      }
      reader.readAsDataURL(file)
    } else setImage(null)
  }

  const normFile = (e) => {
    // TODO: добавить проверок на файл
    console.log('NORM FILE', e)
    handleImagePreviewChange(e)
    console.log('E', e, 'IMAGE', image)
  }

  const [form] = Form.useForm()
  const handleDeleteImage = () => {
    setImage(null)
    setDeleteImage(false)
    form.setFieldsValue({ image: null })
  }

  const [visible, setVisible] = useState(false)

  const [description, setDescription] = useState(
    isEditable ? quest.description : 'Поддерживает Markdown'
  )
  const handleDescriptionPreviewChange = (e) => {
    const trimValue = e.target.value.trim()
    if (trimValue !== '') setDescription(trimValue)
    else setDescription('Поддерживает Markdown')
  }

  const handleSubmit = () => {
    if (!form.getFieldValue('image')) {
      // TODO: добавить стилизацию всем message'ам
      message.error('Без картиночки грустно, добавь ее :)')
    }
  }

  const { Option } = Select

  return (
    <div className='create-quest-form'>
      <div className='create-quest-form__container'>
        <h1>{isEditable ? 'О квесте' : 'Создать новый квест'}</h1>
        <Form
          layout='vertical'
          name='create-quest-form'
          onFinish={onFinish}
          requiredMark={false}
          form={form}
        >
          <Form.Item
            label='Название'
            name='name'
            rules={[
              {
                required: true,
                message: 'Это поле обязательно',
              },
            ]}
            initialValue={isEditable && quest.name}
          >
            <Input
              placeholder='Мой новый квест'
              onChange={handleNamePreviewChange}
            />
          </Form.Item>

          <Form.Item
            label='Обложка'
            name='image'
            className={`create-quest-form__form-item-row 
            create-quest-form__form-item-row-space ${
              !image && 'create-quest-form__cover'
            }`}
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
            initialValue={isEditable && quest.imageUrl}
          >
            {image ? (
              <div className='cover__edit-buttons'>
                <Button
                  type='primary'
                  ghost
                  icon={<PlusOutlined />}
                  style={{ marginRight: '8px' }}
                  onClick={() => setVisible(true)}
                >
                  Заменить
                </Button>
                <Button
                  type='primary'
                  danger
                  ghost
                  icon={<DeleteOutlined />}
                  onClick={() => setDeleteImage(true)}
                >
                  Удалить
                </Button>
                <Modal
                  visible={deleteImage}
                  footer={null}
                  title={null}
                  onCancel={() => setDeleteImage(false)}
                  centered
                  className='delete-modal'
                >
                  <h1>Удалить обложку квеста?</h1>
                  <Button type='primary' onClick={() => setDeleteImage(false)}>
                    Нет, вернуться к квесту
                  </Button>
                  <Button
                    type='primary'
                    danger
                    ghost
                    onClick={handleDeleteImage}
                  >
                    Да, я хочу удалить обложку
                  </Button>
                </Modal>
              </div>
            ) : (
              <Button
                type='primary'
                icon={<PlusOutlined />}
                className='cover__edit-buttons'
                onClick={() => setVisible(true)}
              >
                Загрузить
              </Button>
            )}
            <Modal
              visible={visible}
              footer={null}
              title={null}
              onCancel={() => setVisible(false)}
              centered
              className='cover__modal'
            >
              <Upload.Dragger
                name='file'
                multiple={false}
                maxCount={1}
                accept='image/*'
                showUploadList={false}
                className='cover__upload-drag'
                closable={false}
                onChange={(file) => {
                  console.log('CHANGE', file)
                  normFile(file)
                }}
              >
                <p
                  className='ant-upload-drag-icon'
                  style={{ marginBottom: '5px' }}
                >
                  <SalyDownloadIcon />
                </p>
                <h1>Загрузка обложки квеста</h1>
                <p className='ant-upload-text'>
                  Рекомендуемый размер ― 1140×300 <br /> Нажмите или перетащите
                  картинку сюда
                </p>
              </Upload.Dragger>
              {/* <Button
                type='primary'
                danger
                ghost
                onClick={() => setVisible(false)}
              >
                Закрыть
              </Button> */}
            </Modal>
          </Form.Item>

          <Form.Item
            label='Описание'
            name='description'
            rules={[
              {
                required: true,
                message: 'Это поле тоже обязательно, сами в шоке',
              },
            ]}
            initialValue={isEditable && quest.description}
          >
            <TextArea
              autoSize={{ minRows: 4 }}
              placeholder='Поддерживает Markdown'
              onChange={handleDescriptionPreviewChange}
            />
          </Form.Item>

          <Form.Item
            label='Старт и финиш квеста'
            name='startDate_endDate'
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Пожалуйста выберите дату и время',
              },
            ]}
            initialValue={
              isEditable && [
                moment(new Date(quest.startDate)),
                moment(new Date(quest.endDate)),
              ]
            }
          >
            <RangePicker
              placeholder={['Начало квеста', 'Конец квеста']}
              showTime={{ format: 'HH:mm' }}
              format='DD.MM.YYYY. HH:mm'
            />
          </Form.Item>

          <Form.Item
            label='Регистрация'
            name={'deadlineType'}
            initialValue={
              !isEditable || (isEditable && quest.isRegistrationLimited)
                ? 'withDeadline'
                : 'withoutDeadline'
            }
            style={{ display: 'inline-block' }}
          >
            <Select
              style={{ width: 175, marginRight: '12px' }}
              onChange={handleDeadlineChange}
            >
              <Option value='withDeadline'>С дедлайном</Option>
              <Option value='withoutDeadline'>Открыта все время</Option>
            </Select>
          </Form.Item>

          {!disabled && (!isEditable || (isEditable && !quest.isInfinite)) && (
            <Form.Item
              label={' '}
              name={'registrationDeadline'}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста укажите дату и время',
                },
              ]}
              style={{ display: 'inline-block' }}
              initialValue={
                isEditable &&
                quest.isRegistrationLimited &&
                moment(new Date(quest.registrationDeadline))
              }
            >
              <DatePicker
                placeholder={'Дедлайн регистрации'}
                showTime={{ format: 'HH:mm' }}
                format='DD.MM.YYYY. HH:mm'
                disabled={disabled}
              />
            </Form.Item>
          )}

          {!isEditable && (
            <Form.Item
              name={'maxTeamSize'}
              label='Человек в команде'
              rules={[
                {
                  required: true,
                  message:
                    'Пожалуйста укажите максимальное количество людей в команде',
                },
              ]}
              initialValue={(isEditable && quest.maxTeamSize) || '5'}
            >
              <InputNumber
                min={1}
                max={100}
                disabled={isEditable}
                defaultValue={(isEditable && quest.maxTeamSize) || '5'}
              />
            </Form.Item>
          )}

          {/* <div className='create-quest-form__access-settings'>
            <h2>Настройки доступа</h2>

            <Form.Item
              label='Квест доступен'
              name={'accessType'}
              rules={[
                {
                  required: true,
                  message: 'Не пропускайте это поле, оно важное',
                },
              ]}
              className='create-quest-form__form-item-row'
              initialValue={'link'}
              style={{
                columnGap: '21px',
              }}
            >
              // TODO: onChange добавить и isEditable
              <Select style={{ width: 138 }}>
                <Option value='link'>по ссылке</Option>
                <Option value='all'>всем</Option>
              </Select>
            </Form.Item> */}

          {/* <Form.Item
              label='Ссылка на квест'
              name={'questLink'}
              rules={[
                {
                  required: true,
                  message:
                    'Дайте возможность людям найти этот квест, заполните поле',
                },
              ]}
            >
              { // TODO: добавить генерацию адекватную (вместо defaultValue) и условию отображения этого поля
              }
              <Input addonBefore='questspace.app/quests/' defaultValue='21' />
            </Form.Item> 
          </div>*/}

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className=''
              onClick={handleSubmit}
            >
              {isEditable ? 'Сохранить изменения' : 'Создать квест'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className='create-quest-form__container preview-quest-form'>
        <h1>Предпросмотр</h1>
        {image ? (
          <img
            src={image}
            alt={image.name || 'Ваша обложка'}
            className='preview-quest-form__img'
          ></img>
        ) : (
          <div className='preview-quest-form__default-img'></div>
        )}
        <h1>{name}</h1>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  )
}

CreateQuestFormTemplate.propTypes = {
  submitFunction: PropTypes.func,
}
