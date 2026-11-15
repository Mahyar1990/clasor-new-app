const labels = { editor: 'ویرایشگر', guest: 'مهمان', compact: 'فشرده', empty: 'خالی', loading: 'بارگذاری', error: 'خطا' };
export async function chooseSelect(page, trigger, value) {
  await trigger.click();
  await page.getByRole('option', { name: labels[value] ?? value, exact: true }).click();
  await page.getByRole('listbox').waitFor({ state: 'hidden' });
}
