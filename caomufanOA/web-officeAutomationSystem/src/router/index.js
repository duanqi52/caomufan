import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      meta: {title: '草木蕃内部管理系统'},
      name: 'index',
      component: () => import('@/views/index/index')
    },
    // 登录
    {
      path: '/login',
      meta: {title: '登录'},
      name: 'login',
      component: () => import('@/views/login/index')
    },
    // 微信登录跳转页面
    {
      path: '/resetLogin',
      name: 'resetLogin',
      component: () => import('@/views/login/resetLogin')
    },
    // 组织架构    通讯录
    {
      path: '/addressBook',
      meta: {title: '组织架构'},
      name: 'addressBook',
      component: () => import('@/views/addressBook/index')
    },
    // 审批流程
    {
      path: '/aprovalProcess',
      name: 'aprovalProcess',
      component: () => import('@/views/aprovalProcess/index'),
      children: [
        {
          meta: {title: '审批流程'},
          path: 'paymentPurchase',
          name: 'aprovalProcess/paymentPurchase',
          component: () => import('@/views/aprovalProcess/paymentPurchase/index')
        },
        {
          meta: {title: '审批流程'},
          path: 'expenseReimbursement',
          name: 'aprovalProcess/expenseReimbursement',
          component: () => import('@/views/aprovalProcess/expenseReimbursement/index')
        },
        {
          meta: {title: '审批流程'},
          path: 'loanApproval',
          name: 'aprovalProcess/loanApproval',
          component: () => import('@/views/aprovalProcess/loanApproval/index')
        },
        {
          meta: {title: '审批流程'},
          path: 'travelExpenses',
          name: 'aprovalProcess/travelExpenses',
          component: () => import('@/views/aprovalProcess/travelExpenses/index')
        },
      ]
    },
    // 财务审批
    {
      path: '/financialAproval',
      name: 'financialAproval',
      component: () => import('@/views/financialAproval/index'),
      children: [
        {
          meta: {
            title: '财务审批',
            parent:'财务审批',
          },
          path: 'paymentPurchase',
          name: '/financialAproval/paymentPurchase',
          component: () => import('@/views/financialAproval/paymentPurchase/index')
        },
        {
          meta: {
            title: '财务审批',
            parent:'支付采购申请单',
          },
          path: 'paymentPurchase/addOrEdit',
          name: '/financialAproval/paymentPurchaseAdd/addOrEdit',
          component: () => import('@/views/financialAproval/paymentPurchase/addOrEdit')
        },
        {
          meta: {
            title: '财务审批',
            parent:'支付采购申请单',
          },
          path: 'paymentPurchase/itemDetail',
          name: '/financialAproval/paymentPurchaseAdd/itemDetail',
          component: () => import('@/views/financialAproval/paymentPurchase/itemDetail')
        },
        {
          meta: {
            title: '财务审批',
            parent:'财务审批',
          },
          path: 'expenseReimbursement',
          name: '/financialAproval/expenseReimbursement',
          component: () => import('@/views/financialAproval/expenseReimbursement/index')
        },
        {
          meta: {
            title: '财务审批',
            parent:'费用报销审批单',
          },
          path: 'expenseReimbursement/addOrEdit',
          name: '/financialAproval/expenseReimbursement/addOrEdit',
          component: () => import('@/views/financialAproval/expenseReimbursement/addOrEdit')
        },
        {
          meta: {
            title: '财务审批',
            parent:'费用报销审批单',
          },
          path: 'expenseReimbursement/itemDetail',
          name: '/financialAproval/expenseReimbursement/itemDetail',
          component: () => import('@/views/financialAproval/expenseReimbursement/itemDetail')
        },
        {
          meta: {
            title: '财务审批',
            parent:'财务审批',
          },
          path: 'loanApproval',
          name: '/financialAproval/loanApproval',
          component: () => import('@/views/financialAproval/loanApproval/index')
        },
        {
          meta: {
            title: '财务审批',
            parent:'借款审批单',
          },
          path: 'loanApproval/addOrEdit',
          name: '/financialAproval/loanApproval/addOrEdit',
          component: () => import('@/views/financialAproval/loanApproval/addOrEdit')
        },
        {
          meta: {
            title: '财务审批',
            parent:'借款审批单',
          },
          path: 'loanApproval/itemDetail',
          name: '/financialAproval/loanApproval/itemDetail',
          component: () => import('@/views/financialAproval/loanApproval/itemDetail')
        },
        {
          meta: {
            title: '财务审批',
            parent:'财务审批',
          },
          path: 'travelExpenses',
          name: '/financialAproval/travelExpenses',
          component: () => import('@/views/financialAproval/travelExpenses/index')
        },
        {
          meta: {
            title: '财务审批',
            parent:'差旅费审批单',
          },

          path: 'travelExpenses/addOrEdit',
          name: '/financialAproval/travelExpenses/addOrEdit',
          component: () => import('@/views/financialAproval/travelExpenses/addOrEdit')
        },
        {
          meta: {
            title: '财务审批',
            parent:'差旅费审批单',
          },

          path: 'travelExpenses/itemDetail',
          name: '/financialAproval/travelExpenses/itemDetail',
          component: () => import('@/views/financialAproval/travelExpenses/itemDetail')
        },
        {
          meta: {
            title: '财务审批',
            parent:'财务审批',
          },
          path: 'costUse',
          name: '/financialAproval/costUse',
          component: () => import('@/views/financialAproval/costUse/index')
        },
        {
          meta: {
            title: '财务审批',
            parent:'费用用途清单',
          },
          path: 'costUse/addOrEdit',
          name: '/financialAproval/costUse/addOrEdit',
          component: () => import('@/views/financialAproval/costUse/addOrEdit')
        },
        {
          meta: {
            title: '财务审批',
            parent:'费用用途清单',
          },
          path: 'costUse/itemDetail',
          name: '/financialAproval/costUse/itemDetail',
          component: () => import('@/views/financialAproval/costUse/itemDetail')
        },
      ]
    },
      // 我的流程
    {
      path: '/myProcess',
      name: 'myProcess',
      component: () => import('@/views/myProcess/index'),
      children: [
        {
          meta: {title: '我的流程'},
          path: 'needDealt',
          name: '/myProcess/needDealt',
          component: () => import('@/views/myProcess/needDealt/index')
        },
        {
          meta: {title: '我的流程'},
          path: 'needDealt/itemDetail',
          name: '/myProcess/needDealt/itemDetail',
          component: () => import('@/views/myProcess/needDealt/itemDetail')
        },
        {
          meta: {title: '我的流程'},
          path: 'needRead',
          name: '/myProcess/needRead',
          component: () => import('@/views/myProcess/needRead/index')
        },
        {
          meta: {title: '我的流程'},
          path: 'needRead/itemDetail',
          name: '/myProcess/needRead/itemDetail',
          component: () => import('@/views/myProcess/needRead/itemDetail')
        },
        {
          meta: {title: '我的流程'},
          path: 'iStarted',
          name: '/myProcess/iStarted',
          component: () => import('@/views/myProcess/iStarted/index')
        },
        {
          meta: {title: '我的流程'},
          path: 'iStarted/itemDetail',
          name: '/myProcess/iStarted/itemDetail',
          component: () => import('@/views/myProcess/iStarted/itemDetail')
        },
        {
          meta: {title: '我的流程'},
          path: 'completed',
          name: '/myProcess/completed',
          component: () => import('@/views/myProcess/completed/index')
        },
        {
          meta: {title: '我的流程'},
          path: 'completed/itemDetail',
          name: '/myProcess/completed/itemDetail',
          component: () => import('@/views/myProcess/completed/itemDetail')
        },
        {
          meta: {title: '我的流程'},
          path: 'whole',
          name: '/myProcess/whole',
          component: () => import('@/views/myProcess/whole/index')
        },
        {
          meta: {title: '我的流程'},
          path: 'whole/itemDetail',
          name: '/myProcess/whole/itemDetail',
          component: () => import('@/views/myProcess/whole/itemDetail')
        },
      ]
    },
    // 角色管理
    {
      path: '/roleManage',
      meta: {title: '角色管理'},
      name: 'roleManage',
      component: () => import('@/views/roleManage/index')
    },
    // 意向项目
    {
      path: '/IntentionProject',
      meta: {title: '意向项目'},
      name: 'IntentionProject',
      component: () => import('@/views/IntentionProject/index'),
      // children: [
      //     {
      //     meta: {
      //       title: '意向项目',
      //       parent:'正式项目',
      //     },
      //     path: 'paymentPurchase',
      //     name: '/IntentionProject/paymentPurchase',
      //     component: () => import('@/views/IntentionProject/paymentPurchase/index')
      //   },
      // ]
    },
    // 其他页面
    {
      path: '/otherWeb',
      name: 'otherWeb',
      component: () => import('@/views/otherWeb/index'),
      children: [
        {
          meta: {title: '草木蕃健康填报系统'},
          path: 'healthFebruary',
          name: 'healthFebruary',
          component: () => import('@/views/otherWeb/healthFebruary/index')
        },
        {
          meta: {title: '草木蕃健康填报数据后台'},
          path: 'healthList',
          name: 'healthList',
          component: () => import('@/views/otherWeb/healthFebruary/list')
        },
        {
          meta: {title: '草木蕃健康填报数据详情'},
          path: 'healthDetail',
          name: 'healthDetail',
          component: () => import('@/views/otherWeb/healthFebruary/details')
        }
        ]
    },
    // 404页面
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404/index')
    }
  ]
})
