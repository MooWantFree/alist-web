import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@hope-ui/solid"
import { PageResp } from "~/types"
import { handleResp, r } from "~/utils"
import { createEffect, createSignal, For } from "solid-js"

interface CounterResp {
  id: number // 文件 ID
  file_name: string // 文件名
  file_path: string // 文件路径
  time: string // 时间戳
  ip_address: string // IP 地址
  status_code: number // 状态码
}

const Counter = () => {
  const [counters, setCounters] = createSignal<CounterResp[]>([])
  let current_page = 1
  let page_size = 1111
  let time = "time"
  let reverse = false
  const getCounters = async () => {
    const resp: PageResp<CounterResp> = await r.post("/admin/counter/get", {
      current_page: current_page,
      page_size: page_size,
      sort_key: time,
      reverse: reverse,
    })
    handleResp(resp, (data) => setCounters(data.content))
  }

  createEffect(() => {
    getCounters()
  })

  return (
    <Table highlightOnHover dense>
      <TableCaption>DownloadCounter</TableCaption>
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>file_name</Th>
          <Th>file_path</Th>
          <Th>time</Th>
          <Th>ip_address</Th>
          <Th>status_code</Th>
        </Tr>
      </Thead>
      <Tbody>
        <For each={counters()}>
          {(drive) => (
            <Tr>
              {Object.values(drive).map((value, index) => (
                <Td>{value}</Td>
              ))}
            </Tr>
          )}
        </For>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={6}>Total Entries: {counters().length}</Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}

// 导出组件
export default Counter
