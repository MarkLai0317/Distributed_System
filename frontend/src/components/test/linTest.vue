<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <table style="width:100%">
          <tr align="center">
            <th style="width:33.33%">Name</th>
            <th style="width:33.33%">Quantity</th>
            <th style="width:33.33%">Price</th>
          </tr>
          <tr v-for="item in props.row.data" :key="item.id" align="center">
            <td>{{item.good_name}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
          </tr>
        </table>
      </template>
    </el-table-column>
    <el-table-column label="Date" prop="date" align="center"/>
    <el-table-column label="HID" prop="h_id" align="center"/>
    <el-table-column label="Customer" prop="customer" align="center"/>
    <el-table-column label="Total Price" prop="total_price" align="center"/>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          data: [{good_name: 'Coca Cola', quantity: 30, price: 25},
                 {good_name: 'Fish', quantity: 2, price: 300},
                 {good_name: 'Pepper', quantity: 10, price: 30}
          ],
          h_id: '1',
          customer: 'Tom',
          total_price: 300,
        },
        {
          date: '2016-05-02',
          data: [{good_name: 'Banana', quantity: 10, price: 15},
                 {good_name: 'Book', quantity: 3, price: 350}
          ],
          h_id: '2',
          customer: 'Jack',
          total_price: 50,
        },
        {
          date: '2016-05-04',
          data: [{good_name: 'Flower', quantity: 2, price: 250},
                 {good_name: 'Battery', quantity: 5, price: 130},
                 {good_name: 'Pencil', quantity: 10, price: 15},
                 {good_name: 'Wine', quantity: 3, price: 799}
          ],
          h_id: '3',
          customer: 'James',
          total_price: 50,
        },
        {
          date: '2016-05-01',
          data: [{good_name: 'Milk', quantity: 2, price: 149},
          ],
          h_id: '4',
          customer: 'Jimmy',
          total_price: 50,
        },
        {
          date: '2016-05-08',
          data: [{good_name: 'Tomato', quantity: 3, price: 20},
                 {good_name: 'Patato', quantity: 5, price: 30},
                 {good_name: 'Orange Juice', quantity: 1, price: 149}
          ],
          h_id: '5',
          customer: 'Chris',
          total_price: 50,
        },
        {
          date: '2016-05-06',
          data: [{good_name: 'Oil', quantity: 500, price: 500},
                 {good_name: 'French Fries', quantity: 100, price: 49},
                 {good_name: 'Chicken Nuggets', quantity: 50, price: 60},
                 {good_name: 'Hot Dog', quantity: 70, price: 30},
                 {good_name: 'Pizza', quantity: 20, price: 230},
          ],
          h_id: '6',
          customer: 'Stanley',
          total_price: 50,
        },
        {
          date: '2016-05-07',
          data: [{good_name: 'Marijuana', quantity: 87, price: 1500},
          ],
          h_id: '7',
          customer: 'Toyz',
          total_price: 50,
        },
      ],
    }
  },
}
</script>