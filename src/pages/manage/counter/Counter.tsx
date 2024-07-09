import {
  Button,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Spinner,
} from "@hope-ui/solid"
import { PageResp } from "~/types"
import { handleResp, r } from "~/utils"
import { createEffect, createSignal } from "solid-js"
import { FaSolidAngleDown } from "solid-icons/fa"
import "./counter.css"
import { SvgChevronSort, SvgChevronSortDown, SvgChevronSortUp } from "./icons"

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
  const [currentPage, setCurrentPage] = createSignal(1)
  const [pageSize, setPageSize] = createSignal(10)
  const [maxPage, setMaxPage] = createSignal(1)
  const [loading, setLoading] = createSignal(false)

  const getCounters = async () => {
    setLoading(true)
    const resp: PageResp<CounterResp> = await r.post("/admin/counter/get", {
      current_page: currentPage(),
      page_size: pageSize(),
      sort_key: sortKey(),
      reverse: reverse(),
    })
    handleResp(resp, (data) => {
      const result = data.content.map((it) => {
        return {
          ...it,
          time: new Date(it.time).toLocaleString(),
        }
      })
      setMaxPage(resp.data.total)
      setCounters(result)
    })
    setLoading(false)
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(1)
  }

  return (
    <>
      <Table highlightOnHover dense striped="odd">
        <Thead>
          <Tr>
            {["id", "file_name", "file_path", "time", "ip_address"].map(
              (key) => (
                <Th
                  onClick={() => handleHeaderClick(key)}
                  class="fixed-width"
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {key}
                    {sortKey() === key ? (
                      reverse() ? (
                        <SvgChevronSortUp />
                      ) : (
                        <SvgChevronSortDown />
                      )
                    ) : (
                      <SvgChevronSort />
                    )}
                  </div>
                </Th>
              ),
            )}
          </Tr>
        </Thead>

        <Tbody>
          {loading() ? (
            <Tr>
              <Td colSpan={6} style={{ textAlign: "center" }}>
                <Spinner />
              </Td>
            </Tr>
          ) : (
            counters().map((counter) => (
              <Tr>
                {Object.values(counter).map((value, index) => (
                  <Td class="fixed-width" title={value.toString()}>
                    {value}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={6}>Total Entries: {counters().length}</Td>
          </Tr>
        </Tfoot>
      </Table>
      <div class={"page-buttons"}>
        <Menu>
          <MenuTrigger
            as={Button}
            variant="subtle"
            colorScheme="neutral"
            rightIcon={<FaSolidAngleDown />}
          >
            {pageSize().toString()}/每页
          </MenuTrigger>
          <MenuContent>
            <MenuItem onSelect={() => handlePageSizeChange(10)}>10</MenuItem>
            <MenuItem onSelect={() => handlePageSizeChange(20)}>20</MenuItem>
            <MenuItem onSelect={() => handlePageSizeChange(50)}>50</MenuItem>
            <MenuItem onSelect={() => handlePageSizeChange(100)}>100</MenuItem>
          </MenuContent>
        </Menu>
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage() === 1 || loading()}
        >
          首页
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage() - 1)}
          disabled={currentPage() === 1 || loading()}
        >
          Previous
        </Button>
        <Input
          htmlSize={4}
          width="auto"
          placeholder={currentPage().toString()}
          disabled={loading()}
        ></Input>
        <Button
          onClick={() => handlePageChange(currentPage() + 1)}
          disabled={currentPage() === maxPage() || loading()}
        >
          Next
        </Button>
        <Button
          onClick={() => handlePageChange(maxPage())}
          disabled={currentPage() === maxPage() || loading()}
        >
          末页
        </Button>
      </div>
    </>
  )
}

export default Counter
