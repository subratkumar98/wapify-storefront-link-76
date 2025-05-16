
import React from 'react';
import { Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ComparisonTable: React.FC = () => {
  return (
    <section id="comparison" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why GetWapify is the <span className="gradient-text">#1 Choice</span> for Modern Commerce
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare and see why thousands of businesses choose GetWapify
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[250px] font-bold">Feature / Platform</TableHead>
                <TableHead className="bg-whatsapp/5 font-bold">GetWapify</TableHead>
                <TableHead>Shopify</TableHead>
                <TableHead>Odoo</TableHead>
                <TableHead>Wix</TableHead>
                <TableHead>Custom Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Built for Small Businesses</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES (Insta/WhatsApp)</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>Partially</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Setup Time</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">5 Minutes (Instant)</TableCell>
                <TableCell>Medium (Manual setup)</TableCell>
                <TableCell>High (Tech needed)</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coding Required</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">NO</TableCell>
                <TableCell>Some</TableCell>
                <TableCell>YES</TableCell>
                <TableCell>Some</TableCell>
                <TableCell>YES</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">WhatsApp Integrated</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Instagram Friendly</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dropshipping Friendly</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES</TableCell>
                <TableCell>Needs apps</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pricing</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">₹799 / 3 months</TableCell>
                <TableCell>$39+/month (₹3,200+)</TableCell>
                <TableCell>₹8,000+ setup</TableCell>
                <TableCell>₹1,200+/month</TableCell>
                <TableCell>₹10,000+ setup</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sell via DM, Link, QR</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Made for Local/City Stores</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>Partially</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tech Skills Needed</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">NO</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>HIGH</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>HIGH</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Payment Setup</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">Easy (UPI, GPay, etc.)</TableCell>
                <TableCell>Requires gateway setup</TableCell>
                <TableCell>Complex</TableCell>
                <TableCell>Manual</TableCell>
                <TableCell>Developer needed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AI Smart Store Features</TableCell>
                <TableCell className="bg-whatsapp/5 font-semibold text-whatsapp">YES (Coming soon)</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>NO</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
