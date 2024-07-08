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
import { createEffect, createSignal } from "solid-js"

interface CounterResp {
  id: number
  file_name: string
  file_path: string
  time: string
  ip_address: string
  status_code: number
}

const Counter = () => {
  const [counters, setCounters] = createSignal<CounterResp[]>([])
  const [reverse, setReverse] = createSignal(false)
  const [sortKey, setSortKey] = createSignal("time")
  let current_page = 1
  let page_size = 1111

  const getCounters = async () => {
    const resp: PageResp<CounterResp> = await r.post("/admin/counter/get", {
      current_page: current_page,
      page_size: page_size,
      sort_key: sortKey(),
      reverse: reverse(),
    })
    handleResp(resp, (data) => setCounters(data.content))
  }

  createEffect(() => {
    getCounters()
  })

  const handleHeaderClick = (key: string) => {
    if (sortKey() === key) {
      setReverse(!reverse())
    } else {
      setSortKey(key)
      setReverse(false)
    }
  }

  return (
    <Table highlightOnHover dense>
      <TableCaption>DownloadCounter</TableCaption>
      <Thead>
        <Tr>
          <Th
            onClick={() => handleHeaderClick("id")}
            style={{ cursor: "pointer" }}
          >
            id
          </Th>
          <Th
            onClick={() => handleHeaderClick("file_name")}
            style={{ cursor: "pointer" }}
          >
            file_name
          </Th>
          <Th
            onClick={() => handleHeaderClick("file_path")}
            style={{ cursor: "pointer" }}
          >
            file_path
          </Th>
          <Th
            onClick={() => handleHeaderClick("time")}
            style={{ cursor: "pointer" }}
          >
            time
          </Th>
          <Th
            onClick={() => handleHeaderClick("ip_address")}
            style={{ cursor: "pointer" }}
          >
            ip_address
          </Th>
          <Th
            onClick={() => handleHeaderClick("status_code")}
            style={{ cursor: "pointer" }}
          >
            status_code
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {counters().map((drive) => (
          <Tr>
            {Object.values(drive).map((value, index) => (
              <Td>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={6}>Total Entries: {counters().length}</Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}

export default Counter
