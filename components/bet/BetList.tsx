import {
  Link as MuiLink,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";

/**
 * A component with a list of bets.
 *
 * TODO: Use bet card component instead of table.
 */
export default function BetList(props: { bets: Array<any>; sx?: SxProps }) {
  if (props.bets) {
    return (
      <TableContainer sx={{ maxWidth: 540, ...props.sx }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Min Price</TableCell>
              <TableCell align="right">Max Price</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.bets.map((bet) => (
              <TableRow
                key={bet.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link href={`/bets/${bet.id}`} legacyBehavior passHref>
                    <MuiLink>
                      <Typography>Bet #{bet.id}</Typography>
                    </MuiLink>
                  </Link>
                </TableCell>
                <TableCell align="right">{bet.symbol}</TableCell>
                <TableCell align="right">{bet.minPrice} USD</TableCell>
                <TableCell align="right">{bet.maxPrice} USD</TableCell>
                <TableCell align="right">
                  {new Date(bet.dayStartTimestamp * 1000).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <></>;
}
