import { Td, Text, Tr, Table } from "@hope-ui/solid"
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

type TableData = {
  id: number
  fileName: string
  filePath: string
  time: number
  ip_address: number
  status_code: number
}

type TableComponentProps = {
  caption: string
  data: TableData[]
}
const Counter = () => {
  const [drivers, setDrivers] = createSignal<CounterResp[]>()

  const getDrivers = async () => {
    const resp: PageResp<CounterResp> = await r.post("/admin/counter/get", {
      current_page: 1,
      page_size: 1111,
      sort_key: "time",
      reverse: false,
    })
    handleResp(resp, (data) => setDrivers(data.content))
  }

  // 使用 createEffect 来确保在组件挂载时请求数据
  createEffect(() => {
    getDrivers()
  })

  return (
    <>
      <Table highlightOnHover dense>
        <For each={drivers()}>
          {(drive) => (
            <Tr>
              <Td>{drive.file_name}</Td>
              <Td>{drive.file_path}</Td>
              <Td>{drive.time}</Td>
              <Td>{drive.ip_address}</Td>
              <Td>{drive.status_code}</Td>
            </Tr>
          )}
        </For>
      </Table>
      {/*<Text>{JSON.stringify(drivers())}</Text>*/}
    </>
  )
}

// 导出组件
export default Counter
