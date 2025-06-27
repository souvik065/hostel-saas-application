import type { Meta, StoryObj } from '@storybook/react';
import CrewFeeStructureTable, { FeeStructure } from './CrewFeeStructureTable';
import { CrewTableModalProps } from '../../../types/CrewTable';

const feeStructureList: FeeStructure[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Fee Structure A',
    planTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    feeTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    planType: 'PlanType A',
    feeType: 'FeeTypeA',
    amount: 11000,
    noOfInstallments: 11,
    hostelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    isEditable: true,
    installments: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 1',
        dueDate: '2024-01-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 2',
        dueDate: '2024-02-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 3',
        dueDate: '2024-03-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 4',
        dueDate: '2024-04-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 5',
        dueDate: '2024-05-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 6',
        dueDate: '2024-06-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 7',
        dueDate: '2024-07-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 8',
        dueDate: '2024-08-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 9',
        dueDate: '2024-09-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 10',
        dueDate: '2024-10-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 11',
        dueDate: '2024-11-01',
        amount: 1000,
        isActive: true,
      },
    ],
    total: 5000,
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Fee Structure A',
    planTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    feeTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    planType: 'PlanType A',
    feeType: 'FeeTypeA',
    amount: 5000,
    noOfInstallments: 5,
    hostelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    isEditable: true,
    installments: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 1',
        dueDate: '2024-01-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 2',
        dueDate: '2024-02-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 3',
        dueDate: '2024-03-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 4',
        dueDate: '2024-04-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 5',
        dueDate: '2024-05-01',
        amount: 1000,
        isActive: true,
      },
    ],
    total: 5000,
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Fee Structure C',
    planTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    feeTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    planType: 'PlanType C',
    feeType: 'FeeTypeC',
    amount: 11000,
    noOfInstallments: 8,
    hostelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    isEditable: true,
    installments: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 1',
        dueDate: '2024-01-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 2',
        dueDate: '2024-02-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 3',
        dueDate: '2024-03-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 4',
        dueDate: '2024-04-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 5',
        dueDate: '2024-05-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 6',
        dueDate: '2024-06-01',
        amount: 1000,
        isActive: true,
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Instalment 7',
        dueDate: '2024-07-01',
        amount: 1000,
        isActive: true,
      },
    ],
    total: 5000,
  },
];

const meta = {
  title: 'Organisms/CrewFeeStructureTable',
  component: CrewFeeStructureTable,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    feeStructures: { control: 'object' },
    Modal: { control: 'object' },
  },
} as Meta<typeof CrewFeeStructureTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    feeStructures: feeStructureList,
    Modal: {
      open: false,
      onClose: () => {
        console.log('close model');
      },
      onActionSelect: () => {
        console.log('handle Action select');
      },
      anchorEl: null,
      actions: [
        { id: 1, label: 'View' },
        { id: 2, label: 'Edit' },
        { id: 3, label: 'Delete' },
      ],
    } as CrewTableModalProps,
  },
};
