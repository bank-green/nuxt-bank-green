<template>
  <div class="block w-full overflow-x-auto mb-8">
    <table class="items-center bg-transparent w-full border-collapse bg-white">
      <thead>
        <tr class="bg-sushi-200 text-primary-dark">
          <th class="px-6  align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Institution Name
          </th>
          <th class="px-6  align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Rating
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in tableRows"
          :key="index"
          :class="(index %2) ? 'bg-sushi-50' : 'bg-white'"
        >
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold">
            {{ row.institution }}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            {{ row.rating }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
interface IGoogleSheetResponse {
    range: string;
    majorDimension: string;
    values: string[][]
}
interface ITableRow {
    institution: string;
    rating: string;
}
const { data } = useAsyncData<IGoogleSheetResponse>(() => $fetch('/api/league-table'))
// const tableColumns = [
//   { field: 'institution', label: 'Institution Name' },
//   { field: 'score', label: 'Score' },
//   { field: 'rating', label: 'Rating' }
// ]
const tableRows = computed<ITableRow[]>(() => data.value?.values.map(sheetRow => ({
  institution: sheetRow[1],
  rating: sheetRow[4]
}) || []))
</script>
