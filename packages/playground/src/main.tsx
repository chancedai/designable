import React from 'react'
import ReactDOM from 'react-dom'
import {
  Designer,
  IconWidget,
  Workbench,
  ViewPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  OutlineTreeWidget,
  DragSourceWidget,
  MainPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  SettingsPanel,
  HistoryWidget,
} from '@designable/react'
import { SettingsForm, MonacoInput } from '@designable/react-settings-form'
import { observer } from '@formily/react'
import {
  createDesigner,
  GlobalRegistry,
  GlobalDragSource,
} from '@designable/core'
import { Content } from './content'
import { Space, Button, Radio } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
//import { Sandbox } from '@designable/react-sandbox'
import 'antd/dist/antd.less'
import './theme.less'

GlobalRegistry.registerDesignerProps({
  Root: {
    title: 'components.Root',
  },
  Field: (node) => ({
    title: `components.${node.props['x-component']}`,
    draggable: true,
    inlineLayout: true,
    sourceIcon: 'InputSource',
    propsSchema: {
      type: 'object',
      $namespace: 'Field',
      properties: {
        'field-properties': {
          type: 'void',
          'x-component': 'CollapseItem',
          title: '字段属性',
          properties: {
            title: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },

            hidden: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },
            default: {
              'x-decorator': 'FormItem',
              'x-component': 'ValueInput',
            },
            test: {
              type: 'void',
              title: '测试',
              'x-decorator': 'FormItem',
              'x-component': 'DrawerSetter',
              'x-component-props': {
                text: '打开抽屉',
              },
              properties: {
                test: {
                  type: 'string',
                  title: '测试输入',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
          },
        },

        'component-styles': {
          type: 'void',
          title: '样式',
          'x-component': 'CollapseItem',
          properties: {
            'style.width': {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'SizeInput',
            },
            'style.height': {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'SizeInput',
            },
            'style.display': {
              'x-component': 'DisplayStyleSetter',
            },
            'style.background': {
              'x-component': 'BackgroundStyleSetter',
            },
            'style.boxShadow': {
              'x-component': 'BoxShadowStyleSetter',
            },
            'style.font': {
              'x-component': 'FontStyleSetter',
            },
            'style.margin': {
              'x-component': 'BoxStyleSetter',
            },
            'style.padding': {
              'x-component': 'BoxStyleSetter',
            },
            'style.borderRadius': {
              'x-component': 'BorderRadiusStyleSetter',
            },
            'style.border': {
              'x-component': 'BorderStyleSetter',
            },
          },
        },
      },
    },
  }),
  Card: {
    title: 'components.Card',
    droppable: true,
    sourceIcon: 'CardSource',
    inlineChildrenLayout: true,
    // allowAppend: (target, sources) =>
    //   sources.every((node) => node.componentName === 'Field'),
  },
})

GlobalDragSource.setSourcesByGroup('form', [
  {
    componentName: 'Field',
    designerProps: {
      allowDrop(parent) {
        return parent.componentName === 'Card'
      },
    },
    designerLocales: {
      'zh-CN': {
        settings: {
          default: '默认值1',
        },
      },
    },
    props: {
      title: '输入框',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
  {
    componentName: 'Field',
    designerLocales: {
      'zh-CN': {
        settings: {
          default: '默认值2',
        },
      },
    },
    props: {
      title: '输入框',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
  {
    componentName: 'Card',
    props: {
      title: '卡片',
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'Card',
    },
  },
  {
    componentName: 'Card',
    props: {
      title: '卡片',
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'Card',
    },
    designerProps: {
      title: 'title',
    },
    designerLocales: {
      'zh-CN': {
        title: '卡片2',
      },
      'en-US': {
        title: 'Card2',
      },
    },
    children: [
      {
        componentName: 'Field',
        designerProps: {
          allowDrop(parent) {
            return parent.componentName === 'Card'
          },
        },
        props: {
          title: '输入框',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  },
])

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Displays: '展示控件',
      Feedbacks: '反馈控件',
    },
    components: {
      Root: '表单',
      Input: '输入框',
      Card: '卡片',
    },
    settings: {
      title: '标题',
      hidden: '是否隐藏',
      default: '默认值',
      style: {
        width: '宽度',
        height: '高度',
        display: '展示',
        background: '背景',
        boxShadow: '阴影',
        font: '字体',
        margin: '外边距',
        padding: '内边距',
        borderRadius: '圆角',
        border: '边框',
      },
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Displays: 'Displays',
      Feedbacks: 'Feedbacks',
    },
    components: {
      Root: 'Form',
      Input: 'Input',
      Card: 'Card',
    },
    settings: {
      title: 'Title',
      hidden: 'Hidden',
      default: 'Default Value',
      style: {
        width: 'Width',
        height: 'Height',
        display: 'Display',
        background: 'Background',
        boxShadow: 'Box Shadow',
        font: 'Font',
        margin: 'Margin',
        padding: 'Padding',
        borderRadius: 'Border Radius',
        border: 'Border',
      },
    },
  },
})

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
    <IconWidget
      infer="Logo"
      style={{ margin: 10, height: 24, width: 'auto' }}
    />
  </div>
)

const Actions = observer(() => (
  <Space style={{ marginRight: 10 }}>
    <Radio.Group
      value={GlobalRegistry.getDesignerLanguage()}
      optionType="button"
      options={[
        { label: 'English', value: 'en-us' },
        { label: '简体中文', value: 'zh-cn' },
      ]}
      onChange={(e) => {
        GlobalRegistry.setDesignerLanguage(e.target.value)
      }}
    />
    <Button href="https://github.com/alibaba/designable" target="_blank">
      <GithubOutlined />
      Github
    </Button>
    <Button>保存</Button>
    <Button type="primary">发布</Button>
  </Space>
))

const engine = createDesigner()

const App = () => {
  return (
    <Designer engine={engine}>
      <Workbench>
        <MainPanel logo={<Logo />} actions={<Actions />}>
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
              <DragSourceWidget title="sources.Inputs" name="form" />
              <DragSourceWidget title="sources.Displays" name="form" />
              <DragSourceWidget title="sources.Feedbacks" name="form" />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget />{' '}
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel>
              <ViewPanel type="JSONTREE">
                {(tree) => {
                  return (
                    <div style={{ overflow: 'hidden', height: '100%' }}>
                      <MonacoInput
                        language="javascript"
                        helpCode="//hello world"
                        defaultValue={`<div><div>123123<div>123123<div>123123<div>123123</div></div></div></div></div>`}
                      />
                    </div>
                  )
                }}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </MainPanel>
      </Workbench>
    </Designer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
